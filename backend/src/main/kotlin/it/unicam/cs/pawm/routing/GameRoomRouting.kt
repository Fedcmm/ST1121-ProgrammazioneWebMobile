package it.unicam.cs.pawm.routing

import io.ktor.http.*
import io.ktor.server.response.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.routing.*
import it.unicam.cs.pawm.database.GameRoomGamesService
import it.unicam.cs.pawm.database.GameRoomService

import it.unicam.cs.pawm.model.GameRoom

fun Route.gameRoomRouting() {

    route("/gameroom") {
        get("/{id}") {
            val id = call.parameters["id"]?.toInt() ?: throw IllegalArgumentException("Invalid ID")
            val gameRoom = GameRoomService.read(id)

            if (gameRoom != null)
                call.respond(HttpStatusCode.OK, gameRoom)
            else
                call.respond(HttpStatusCode.NotFound)
        }

        get("/all") {
            val gameRooms = GameRoomService.readAll()
            call.respond(HttpStatusCode.OK, gameRooms)
        }

        get("/{id}/games") {
            val id = call.parameters["id"]?.toInt() ?: throw IllegalArgumentException("Invalid ID")
            val games = GameRoomGamesService.read(id)
            call.respond(HttpStatusCode.OK, games)
        }

        get("/{id}/events") {

        }

        post("/") {
            val gameRoom = call.receive<GameRoom>()
            val id = GameRoomService.add(gameRoom)
            call.respond(HttpStatusCode.Created, id)
        }

        patch("/{id}") {
            val gameRoom = call.receive<GameRoom>()
            GameRoomService.update(gameRoom)
            call.respond(HttpStatusCode.OK)
        }

        delete("/{id}") {
            val id = call.parameters["id"]?.toInt() ?: throw IllegalArgumentException("Invalid ID")
            GameRoomService.delete(id)
            call.respond(HttpStatusCode.OK)
        }
    }
}