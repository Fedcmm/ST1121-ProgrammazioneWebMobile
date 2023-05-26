package it.unicam.cs.pawm.routing

import io.ktor.http.*
import io.ktor.server.response.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.request.*
import io.ktor.server.routing.*
import io.ktor.server.sessions.*
import it.unicam.cs.pawm.database.GameService

import it.unicam.cs.pawm.model.Game

/*fun Application.gameRouting() {
    val gameService = GameService()

    routing {
        route("/") {
            authenticate("auth-session", optional = false) {
                get("/") {
                    val gameSession = call.principal<GameSession>()
                    if (gameSession == null) {
                        call.respond(HttpStatusCode.Unauthorized, "No session")
                        return@get
                    }
                    call.sessions.set(gameSession.copy(count = gameSession.count + 1))
                    println(gameSession.name)

                    val games = gameService.readAll()
                    call.respond(HttpStatusCode.OK, games)
                }
            }

            get("/{id}") {
                val id = call.parameters["id"]?.toInt() ?: throw IllegalArgumentException("Invalid ID")
                val game = gameService.read(id)

                if (game != null)
                    call.respond(HttpStatusCode.OK, game)
                else
                    call.respond(HttpStatusCode.NotFound)
            }

            post("/") {
                val game = call.receive<Game>()
                val id = gameService.add(game)
                call.respond(HttpStatusCode.Created, id)
            }

            patch("/{id") {
                val id = call.parameters["id"]?.toInt() ?: throw IllegalArgumentException("Invalid ID")
                val game = call.receive<Game>()
                gameService.update(id, game)
                call.respond(HttpStatusCode.OK)
            }

            delete("/{id}") {
                val id = call.parameters["id"]?.toInt() ?: throw IllegalArgumentException("Invalid ID")
                gameService.delete(id)
                call.respond(HttpStatusCode.OK)
            }
        }
    }
}*/