package it.unicam.cs.pawm.utils

import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import com.auth0.jwt.interfaces.DecodedJWT
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.auth.jwt.*
import io.ktor.util.pipeline.*
import it.unicam.cs.pawm.model.TokenPair
import it.unicam.cs.pawm.property
import java.time.Instant

const val REFRESH_DURATION = 120L // seconds
const val ACCESS_DURATION = 30000L // seconds
// TODO (17/06/23): Revert to 30L


/**
 * Verifies the refresh [token] and returns a [DecodedJWT] if it's valid, null otherwise.
 */
fun Application.verifyRefresh(token: String): DecodedJWT? =
    try {
        JWT.require(Algorithm.HMAC256(property("jwt.refSecret")))
            .withIssuer(property("jwt.issuer"))
            .withClaimPresence("id")
            .withClaimPresence("email")
            .build()
            .verify(token)
    } catch (e: Exception) {
        null
    }

/**
 * Creates a pair of access and refresh tokens for the user with the given [id] and [email].
 */
fun Application.createTokens(id: Int, email: String): TokenPair {
    val builder = JWT.create()
        .withIssuer(property("jwt.issuer"))
        .withClaim("id", id)
        .withClaim("email", email)

    val refresh = builder.sign(Algorithm.HMAC256(property("jwt.refSecret")))
    return TokenPair(
        builder.withExpiresAt(Instant.now().plusSeconds(ACCESS_DURATION)).sign(Algorithm.HMAC256(property("jwt.accSecret"))),
        refresh
    )
}

/**
 * Returns the claim with name "id" from the access token of an authenticated [JWTPrincipal].
 */
fun ApplicationCall.getIdFromToken(): Int {
    val principal = principal<JWTPrincipal>()!!
    return principal.getClaim("id", Int::class)!!
}