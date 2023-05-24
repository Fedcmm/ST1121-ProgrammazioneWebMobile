package it.unicam.cs.pawm.plugins

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.auth.jwt.*
import io.ktor.server.response.*
import it.unicam.cs.pawm.property
import it.unicam.cs.pawm.utils.jwkProvider

fun Application.configureAuthentication() {
    val issuer = property("jwt.issuer")
    val audience = property("jwt.audience")

    authentication {
        jwt("auth-jwt") {
            verifier(jwkProvider(issuer), issuer) {
                acceptLeeway(3)
            }

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
