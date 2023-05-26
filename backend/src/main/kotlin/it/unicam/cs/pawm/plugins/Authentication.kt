package it.unicam.cs.pawm.plugins

import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.auth.jwt.*
import io.ktor.server.response.*
import it.unicam.cs.pawm.property

fun Application.configureAuthentication() {
    val issuer = property("jwt.issuer")
    val audience = property("jwt.audience")
    val secret = property("jwt.accSecret")

    authentication {
        jwt("jwt-access") {
            verifier(JWT
                .require(Algorithm.HMAC256(secret))
                .acceptLeeway(3)
                .withIssuer(issuer)
                .withAudience(audience)
                .build())

            validate { credential ->
                //credential.payload.audience.contains(audience)
                if (credential.payload.expiresAt.time > System.currentTimeMillis())
                    JWTPrincipal(credential.payload)
                else null
            }

            challenge { _, _ ->
                call.respondText("Token is not valid or has expired", status = HttpStatusCode.Unauthorized)
            }
        }
    }
}
