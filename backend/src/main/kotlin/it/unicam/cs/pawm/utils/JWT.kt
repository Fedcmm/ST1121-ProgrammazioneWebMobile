package it.unicam.cs.pawm.utils

import com.auth0.jwk.JwkProvider
import com.auth0.jwk.JwkProviderBuilder
import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import com.auth0.jwt.interfaces.DecodedJWT
import io.ktor.server.application.*
import it.unicam.cs.pawm.property
import java.security.KeyFactory
import java.security.interfaces.RSAPrivateKey
import java.security.interfaces.RSAPublicKey
import java.security.spec.PKCS8EncodedKeySpec
import java.time.Instant
import java.util.*
import java.util.concurrent.TimeUnit

const val REFRESH_DURATION = 60L
const val ACCESS_DURATION = 30L

fun Application.verifyToken(token: String, publicKeyId: String, email: String): DecodedJWT? {
    val issuer = property("jwt.issuer")

    return try {
        JWT.require(rsaAlgorithm(publicKeyId, issuer))
            .withIssuer(issuer)
            .withClaim("email", email)
            .acceptLeeway(3)
            .build()
            .verify(token)
    } catch (e: Exception) {
        null
    }
}

fun Application.createToken(publicKeyId: String, duration: Long, email: String): String {
    val issuer = property("jwt.issuer")
    val audience = property("jwt.audience")

    return JWT.create()
        .withAudience(audience)
        .withIssuer(issuer)
        .withClaim("email", email)
        .withExpiresAt(Instant.now().plusSeconds(duration))
        .sign(rsaAlgorithm(publicKeyId, issuer))
}

fun Application.createRefresh(email: String) = createToken("sig-1684769876", REFRESH_DURATION, email)
fun Application.createAccess(email: String) = createToken("sig-1682930901", ACCESS_DURATION, email)

fun Application.rsaAlgorithm(publicKeyId: String, issuer: String): Algorithm {
    val privateKeyString = property("jwt.privateKey")

    val publicKey = jwkProvider(issuer).get(publicKeyId).publicKey // TODO: Setup JWKs
    val keySpec = PKCS8EncodedKeySpec(Base64.getDecoder().decode(privateKeyString))
    val privateKey = KeyFactory.getInstance("RSA").generatePrivate(keySpec)

    return Algorithm.RSA256(publicKey as RSAPublicKey, privateKey as RSAPrivateKey)
}

fun jwkProvider(issuer: String): JwkProvider = JwkProviderBuilder(issuer)
    .cached(10, 24, TimeUnit.HOURS)
    .rateLimited(10, 1, TimeUnit.MINUTES)
    .build()
