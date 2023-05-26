package it.unicam.cs.pawm.routing

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.http.content.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.util.date.*
import io.ktor.util.pipeline.*
import it.unicam.cs.pawm.database.PlayerRefreshService
import it.unicam.cs.pawm.database.PlayerService
import it.unicam.cs.pawm.model.Player
import it.unicam.cs.pawm.model.RefreshToken
import it.unicam.cs.pawm.utils.*
import kotlinx.serialization.Serializable
import java.io.File
import java.time.Instant

fun Route.authenticationRouting() {
    route("/player") {
        post("/login") {
            val credentials = call.receive<Credentials>()
            val id = PlayerService.checkCredentials(credentials.email, credentials.password)
            if (id < 0) {
                call.respondText("Invalid credentials", status = HttpStatusCode.Unauthorized)
                return@post
            }

            val refresh = application.createRefresh(credentials.email)
            call.response.addRefreshCookie(refresh)
            PlayerRefreshService.add(RefreshToken(id, refresh, Instant.now().plusSeconds(REFRESH_DURATION).epochSecond))

            val access = application.createAccess(credentials.email)
            call.respond(hashMapOf(
                "id" to id.toString(),
                "token" to access
            ))
        }

        post("/signup") {
            val player = call.receive<Player>()

            if (PlayerService.accountExists(player.email)) {
                call.respondText("Account already exists", status = HttpStatusCode.BadRequest)
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

        post("{id}/refresh") {
            val email = call.receive<String>()
            val id = call.parameters["id"]!!.toInt()

            if (!validateRefresh(id, email)) return@post

            val refresh = application.createRefresh(email)
            PlayerRefreshService.update(id, refresh)

            call.response.addRefreshCookie(refresh)
            call.respond(hashMapOf("token" to application.createAccess(email)))
        }
    }
}

@Serializable
private data class Credentials(val email: String, val password: String)

private fun ApplicationResponse.addRefreshCookie(refresh: String) {
    cookies.append(
        Cookie("refresh_token", refresh, expires = GMTDate().plus(REFRESH_DURATION*1000), httpOnly = true)
    )
}

private suspend fun PipelineContext<Unit, ApplicationCall>.validateRefresh(id: Int, email: String): Boolean {
    val oldToken = application.verifyRefresh(call.request.cookies["refresh_token"]!!, email)
    if (oldToken == null) {
        call.respondText("Token is not valid", status = HttpStatusCode.Unauthorized)
        PlayerRefreshService.delete(id)
        return false
    }

    val dbToken = PlayerRefreshService.read(id, oldToken.token)
    if (dbToken == null || dbToken.expiration < Instant.now().epochSecond) {
        call.respondText("Token is expired", status = HttpStatusCode.Unauthorized)
        PlayerRefreshService.delete(id)
        return false
    }

    return true
}