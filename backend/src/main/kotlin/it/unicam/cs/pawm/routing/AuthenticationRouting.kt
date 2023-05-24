package it.unicam.cs.pawm.routing

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.http.content.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.util.date.*
import it.unicam.cs.pawm.database.PlayerService
import it.unicam.cs.pawm.model.Player
import it.unicam.cs.pawm.utils.*
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

            val refresh = application.createRefresh(credentials.email)
            call.response.cookies.append(
                Cookie("refresh_token", refresh, expires = GMTDate().plus(REFRESH_DURATION*1000), httpOnly = true)
            )
            // TODO (24/05/23): Save refresh to DB

            val access = application.createAccess(credentials.email)
            call.respond(mapOf("token" to access))
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

            /*val refresh = application.createRefresh(player.email)
            call.response.cookies.append(
                Cookie("refresh_token", refresh, expires = GMTDate().plus(REFRESH_DURATION*1000), httpOnly = true)
            )

            val id = PlayerService.add(player)
            call.respond(HttpStatusCode.Created, mapOf(
                "token" to application.createAccess(player.email),
                "playerId" to id.toString()
            ))*/
        }

        post("/refresh") {
            val email = call.receive<String>()
            val token = application.verifyToken(call.request.cookies["refresh_token"]!!, "sig-1684769876", email)
            if (token == null) {
                call.respondText("Token is not valid or has expired", status = HttpStatusCode.Unauthorized)
                return@post
            }

            call.respond(mapOf("token" to application.createAccess(email)))
        }
    }

    staticFiles(".well-known", File("certs")) {
        staticRootFolder = File("certs")
    }
}

@Serializable
private data class Credentials(val email: String, val password: String)