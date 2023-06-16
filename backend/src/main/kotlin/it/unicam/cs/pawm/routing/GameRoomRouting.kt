package it.unicam.cs.pawm.routing

import io.ktor.http.*
import io.ktor.server.response.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.routing.*
import it.unicam.cs.pawm.database.EventService
import it.unicam.cs.pawm.database.GameRoomService
import it.unicam.cs.pawm.database.GameService
import it.unicam.cs.pawm.model.Event
import it.unicam.cs.pawm.model.Game

import it.unicam.cs.pawm.model.GameRoom
import it.unicam.cs.pawm.utils.getIdFromToken

fun Route.gameRoomRouting() {
    route("/game-room") {
        get("/{id}") {
            val id = call.parameters["id"]?.toInt() ?: run {
                call.respond(HttpStatusCode.BadRequest)
                return@get
            }
            val gameRoom = GameRoomService.read(id)

            if (gameRoom != null)
                call.respond(HttpStatusCode.OK, gameRoom)
            else
                call.respond(HttpStatusCode.NotFound)
        }

        /* TODO: implement salt
        get ("/salt,{'email'}"){
            val email = call.parameters["email"] ?: run {
                call.respond(HttpStatusCode.BadRequest)
                return@get
            }
            val gameRoom = GameRoomService.salt(email)
        }
        */

        get("/all") {
            val gameRooms = GameRoomService.readAll()
            call.respond(HttpStatusCode.OK, gameRooms)
        }

        get("/{id}/games") {
            val id = call.parameters["id"]?.toInt() ?: run {
                call.respond(HttpStatusCode.BadRequest)
                return@get
            }
            val games: List<Game> = GameService.getGameRoomGames(id)
            call.respond(HttpStatusCode.OK, games)
        }

        get("/{id}/events") {
            val id = call.parameters["id"]?.toInt() ?: run {
                call.respond(HttpStatusCode.BadRequest)
                return@get
            }
            val event: List<Event> = EventService.getGameRoomEvents(id)
            call.respond(HttpStatusCode.OK, event)
        }

        post("/") {
            val gameRoom = call.receive<GameRoom>()
            val id = GameRoomService.add(gameRoom)
            call.respond(HttpStatusCode.Created, id)
        }

        patch("/") {
            val id = getIdFromToken()
            val gameRoom = call.receive<GameRoom>()
            GameRoomService.update(id, gameRoom)
            call.respond(HttpStatusCode.OK)
        }

        delete("/") {
            val id = getIdFromToken()
            GameRoomService.delete(id)
            call.respond(HttpStatusCode.OK)
        }
    }
}