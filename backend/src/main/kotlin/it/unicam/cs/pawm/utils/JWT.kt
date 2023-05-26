package it.unicam.cs.pawm.utils

import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import com.auth0.jwt.interfaces.DecodedJWT
import io.ktor.server.application.*
import it.unicam.cs.pawm.property
import java.time.Instant

const val REFRESH_DURATION = 60L // seconds
const val ACCESS_DURATION = 30L // seconds


/**
 * Verifies the [token] and returns it if it's valid, null otherwise.
 */
fun Application.verifyToken(token: String, secret: String, email: String): DecodedJWT? {
    val issuer = property("jwt.issuer")

    return try {
        JWT.require(Algorithm.HMAC256(secret))
            .withIssuer(issuer)
            .withClaim("email", email)
            .acceptLeeway(3)
            .build()
            .verify(token)
    } catch (e: Exception) {
        null
    }
}

fun Application.verifyRefresh(token: String, email: String) = verifyToken(token, property("jwt.refSecret"), email)
fun Application.verifyAccess(token: String, email: String) = verifyToken(token, property("jwt.accSecret"), email)

/**
 * Creates a new token with the given [duration] (in seconds), signed with HS256 using the specified [secret].
 */
fun Application.createToken(secret: String, duration: Long, email: String): String { // TODO (26/05/23): Change duration to expiresAt
    val issuer = property("jwt.issuer")
    val audience = property("jwt.audience")

    return JWT.create()
        .withAudience(audience)
        .withIssuer(issuer)
        .withClaim("email", email)
        .withExpiresAt(Instant.now().plusSeconds(duration))
        .sign(Algorithm.HMAC256(secret))
}

fun Application.createRefresh(email: String) = createToken(property("jwt.refSecret"), REFRESH_DURATION, email)
fun Application.createAccess(email: String) = createToken(property("jwt.accSecret"), ACCESS_DURATION, email)
