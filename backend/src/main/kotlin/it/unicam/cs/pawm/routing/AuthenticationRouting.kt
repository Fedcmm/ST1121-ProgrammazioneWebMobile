package it.unicam.cs.pawm.routing

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.http.content.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import it.unicam.cs.pawm.database.PlayerService
import it.unicam.cs.pawm.model.Player
import it.unicam.cs.pawm.plugins.getJWT
import kotlinx.serialization.Serializable
import java.io.File

fun Route.authenticationRouting() {
    route("/player") {
        post("/login") {
            val credentials = call.receive<Credentials>()
            if (!PlayerService.checkCredentials(credentials.email, credentials.password)) {
                call.respondText("Invalid credentials", status = HttpStatusCode.Unauthorized)
                return@post
            }

            val token = application.getJWT(credentials.email)
            call.respond(mapOf("token" to token))
        }

        post("/signup") {
            val player = call.receive<Player>()

            if (PlayerService.accountExists(player.email)) {
                call.respondText("Account already exists", status = HttpStatusCode.NotAcceptable)
                return@post
            }

            if (player.name.isBlank() || player.surname.isBlank()) {
                call.respondText("Invalid information", status = HttpStatusCode.NotAcceptable)
                return@post
            }
            if (!player.email.matches(Regex("^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}\$")) || player.password.isBlank()) {
                call.respondText("Invalid credentials", status = HttpStatusCode.NotAcceptable)
                return@post
            }

            val id = PlayerService.add(player)
            call.respond(HttpStatusCode.Created, hashMapOf(
                "token" to application.getJWT(player.email),
                "playerId" to id.toString()
            ))
        }
    }

    staticFiles(".well-known", File("certs")) {
        staticRootFolder = File("certs")
    }
}

@Serializable
private data class Credentials(val email: String, val password: String)