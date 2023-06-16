package it.unicam.cs.pawm.routing

import com.auth0.jwt.interfaces.DecodedJWT
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.util.date.*
import io.ktor.util.pipeline.*
import it.unicam.cs.pawm.database.GameRoomRefreshService
import it.unicam.cs.pawm.database.GameRoomService
import it.unicam.cs.pawm.database.PlayerRefreshService
import it.unicam.cs.pawm.database.PlayerService
import it.unicam.cs.pawm.model.GameRoom
import it.unicam.cs.pawm.model.Player
import it.unicam.cs.pawm.model.RefreshToken
import it.unicam.cs.pawm.utils.REFRESH_DURATION
import it.unicam.cs.pawm.utils.createTokens
import it.unicam.cs.pawm.utils.verifyRefresh
import kotlinx.serialization.Serializable
import java.time.Instant

fun Route.authenticationRouting() {
    route("/player") {
        post("/signup") {
            val player = call.receive<Player>()

            if (PlayerService.accountExists(player.email)) {
                call.respondText("Account already exists", status = HttpStatusCode.BadRequest)
                return@post
            }

            if (PlayerService.usernameExists(player.username)) {
                call.respondText("Username is already used", status = HttpStatusCode.BadRequest)
                return@post
            }

            if (player.name.isBlank() || player.surname.isBlank()) {
                call.respondText("Invalid information", status = HttpStatusCode.BadRequest)
                return@post
            }
            if (!player.email.matches(Regex("^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}\$")) || player.password.isBlank()) {
                call.respondText("Invalid credentials", status = HttpStatusCode.BadRequest)
                return@post
            }

            PlayerService.add(player)
            call.respond(HttpStatusCode.Created)
        }

        get("/salt") {
            val email = call.request.queryParameters["email"] ?: run {
                call.respondText("Missing email", status = HttpStatusCode.BadRequest)
                return@get
            }

            PlayerService.getPasswordSalt(email)?.let {
                call.respond(hashMapOf("salt" to it))
            } ?: call.respondText("Account not found", status = HttpStatusCode.NotFound)
        }

        post("/login") {
            val credentials = call.receive<Credentials>()
            val id = PlayerService.checkCredentials(credentials.email, credentials.password)
            if (id < 0) {
                call.respondText("Invalid credentials", status = HttpStatusCode.Unauthorized)
                return@post
            }

            PlayerRefreshService.delete(id)

            val tokens = application.createTokens(id, credentials.email)
            PlayerRefreshService.add(
                RefreshToken(
                    id,
                    tokens.refreshToken,
                    Instant.now().plusSeconds(REFRESH_DURATION).epochSecond
                )
            )

            call.response.addRefreshCookie(tokens.refreshToken)
            call.respond(
                hashMapOf(
                    "id" to id.toString(),
                    "token" to tokens.accessToken
                )
            )
        }

        post("/logout") {
            val id = validateRefresh()?.getClaim("id")?.asInt() ?: return@post
            PlayerRefreshService.delete(id)
            call.respond(HttpStatusCode.OK)
        }

        post("/refresh") {
            val email = call.receive<String>() // TODO (28/05/23): Remove

            val oldRefresh = validateRefresh() ?: return@post
            val id = oldRefresh.getClaim("id").asInt()

            val tokens = application.createTokens(id, email)

            PlayerRefreshService.update(id, tokens.refreshToken)
            call.response.addRefreshCookie(tokens.refreshToken)
            call.respond(hashMapOf("token" to tokens.accessToken))
        }
    }


    route("/gameroom") {
        post("/signup") {
            val gameRoom = call.receive<GameRoom>()

            if (GameRoomService.accountExists(gameRoom.email)) {
                call.respondText("Account already exists", status = HttpStatusCode.BadRequest)
                return@post
            }

            if (gameRoom.name.isBlank()) {
                call.respondText("Invalid information", status = HttpStatusCode.BadRequest)
                return@post
            }
            if (!gameRoom.email.matches(Regex("^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}\$")) || gameRoom.password.isBlank()) {
                call.respondText("Invalid credentials", status = HttpStatusCode.BadRequest)
                return@post
            }
            GameRoomService.add(gameRoom)
            call.respond(HttpStatusCode.Created)
        }

        get("/salt") {
            val email = call.request.queryParameters["email"] ?: run {
                call.respondText("Missing email", status = HttpStatusCode.BadRequest)
                return@get
            }

            GameRoomService.getPasswordSalt(email)?.let {
                call.respond(hashMapOf("salt" to it))
            } ?: call.respondText("Account not found", status = HttpStatusCode.NotFound)
        }

        post("/login") {
            val credentials = call.receive<Credentials>()
            val id = GameRoomService.checkCredentials(credentials.email, credentials.password)
            if (id < 0) {
                call.respondText("Invalid credentials", status = HttpStatusCode.Unauthorized)
                return@post
            }

            GameRoomRefreshService.delete(id)

            val tokens = application.createTokens(id, credentials.email)
            GameRoomRefreshService.add(
                RefreshToken(
                    id,
                    tokens.refreshToken,
                    Instant.now().plusSeconds(REFRESH_DURATION).epochSecond
                )
            )

            call.response.addRefreshCookie(tokens.refreshToken)
            call.respond(
                hashMapOf(
                    "id" to id.toString(),
                    "token" to tokens.accessToken
                )
            )
        }

        post("/logout") {
            val id = validateRefresh()?.getClaim("id")?.asInt() ?: return@post
            GameRoomRefreshService.delete(id)
            call.respond(HttpStatusCode.OK)
        }

        post("/refresh") {
            val email = call.receive<String>() // TODO (28/05/23): Remove

            val oldRefresh = validateRefresh() ?: return@post
            val id = oldRefresh.getClaim("id").asInt()

            val tokens = application.createTokens(id, email)

            GameRoomRefreshService.update(id, tokens.refreshToken)
            call.response.addRefreshCookie(tokens.refreshToken)
            call.respond(hashMapOf("token" to tokens.accessToken))
        }
    }
}

@Serializable
private data class Credentials(val email: String, val password: String)

private fun ApplicationResponse.addRefreshCookie(refresh: String) {
    cookies.append(
        Cookie("refresh_token", refresh, expires = GMTDate().plus(REFRESH_DURATION * 1000), httpOnly = true)
    )
}

private suspend fun PipelineContext<Unit, ApplicationCall>.validateRefresh(): DecodedJWT? {
    val cookieToken = call.request.cookies["refresh_token"] ?: run {
        call.respondText("Refresh token is missing", status = HttpStatusCode.BadRequest)
        return null
    }
    val oldToken = application.verifyRefresh(cookieToken) ?: run {
        call.respondText("Invalid refresh token", status = HttpStatusCode.Unauthorized)
        //PlayerRefreshService.delete(id)
        return null
    }

    val dbToken = PlayerRefreshService.read(oldToken.getClaim("id").asInt())
    if (dbToken == null || dbToken.expiration < Instant.now().epochSecond) {
        call.respondText("Token is expired", status = HttpStatusCode.Unauthorized)
        PlayerRefreshService.delete(oldToken.getClaim("id").asInt())
        return null
    }

    return oldToken
}