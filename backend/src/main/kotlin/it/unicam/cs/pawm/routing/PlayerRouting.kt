package it.unicam.cs.pawm.routing

import io.ktor.http.*
import io.ktor.server.response.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.request.*
import io.ktor.server.routing.*
import io.ktor.server.sessions.*
import it.unicam.cs.pawm.database.PlayerService

import it.unicam.cs.pawm.model.Player

fun Application.playerRouting() {
    val playerService = PlayerService()

    routing {
        route("/") {
            authenticate("auth-session", optional = false) {
                get("/") {
                    val playerSession = call.principal<PlayerSession>()
                    if (playerSession == null) {
                        call.respond(HttpStatusCode.Unauthorized, "No session")
                        return@get
                    }
                    call.sessions.set(playerSession.copy(count = playerSession.count + 1))
                    println(playerSession.name)

                    val players = playerService.readAll()
                    call.respond(HttpStatusCode.OK, players)
                }
            }

            get("/{id}") {
                val id = call.parameters["id"]?.toInt() ?: throw IllegalArgumentException("Invalid ID")
                val player = playerService.read(id)

                if (player != null)
                    call.respond(HttpStatusCode.OK, player)
                else
                    call.respond(HttpStatusCode.NotFound)
            }

            post("/") {
                val player = call.receive<Player>()
                val id = playerService.add(player)
                call.respond(HttpStatusCode.Created, id)
            }

            patch("/{id") {
                val id = call.parameters["id"]?.toInt() ?: throw IllegalArgumentException("Invalid ID")
                val player = call.receive<Player>()
                playerService.update(id, player)
                call.respond(HttpStatusCode.OK)
            }

            delete("/{id}") {
                val id = call.parameters["id"]?.toInt() ?: throw IllegalArgumentException("Invalid ID")
                playerService.delete(id)
                call.respond(HttpStatusCode.OK)
            }
        }
    }
}