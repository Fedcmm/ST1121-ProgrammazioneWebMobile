package it.unicam.cs.pawm.routing

import io.ktor.http.*
import io.ktor.server.response.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.request.*
import io.ktor.server.routing.*
import io.ktor.server.sessions.*
import it.unicam.cs.pawm.database.GameRoomService

import it.unicam.cs.pawm.model.GameRoom

fun Application.gameRoomRouting() {
    val gameRoomService = GameRoomService()

    routing {
        route("/") {
            authenticate("auth-session", optional = false) {
                get("/") {
                    val gameRoomSession = call.principal<GameRoomSession>()
                    if (gameRoomSession == null) {
                        call.respond(HttpStatusCode.Unauthorized, "No session")
                        return@get
                    }
                    call.sessions.set(gameRoomSession.copy(count = gameRoomSession.count + 1))
                    println(gameRoomSession.name)

                    val gameRooms = gameRoomService.readAll()
                    call.respond(HttpStatusCode.OK, gameRooms)
                }
            }

            get("/{id}") {
                val id = call.parameters["id"]?.toInt() ?: throw IllegalArgumentException("Invalid ID")
                val gameRoom = gameRoomService.read(id)

                if (gameRoom != null)
                    call.respond(HttpStatusCode.OK, gameRoom)
                else
                    call.respond(HttpStatusCode.NotFound)
            }

            post("/") {
                val gameRoom = call.receive<GameRoom>()
                val id = gameRoomService.add(gameRoom)
                call.respond(HttpStatusCode.Created, id)
            }

            patch("/{id") {
                val id = call.parameters["id"]?.toInt() ?: throw IllegalArgumentException("Invalid ID")
                val gameRoom = call.receive<GameRoom>()
                gameRoomService.update(id, gameRoom)
                call.respond(HttpStatusCode.OK)
            }

            delete("/{id}") {
                val id = call.parameters["id"]?.toInt() ?: throw IllegalArgumentException("Invalid ID")
                gameRoomService.delete(id)
                call.respond(HttpStatusCode.OK)
            }
        }
    }
}