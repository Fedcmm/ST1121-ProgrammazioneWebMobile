package it.unicam.cs.pawm.routing

import io.ktor.http.*
import io.ktor.server.response.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.routing.*
import it.unicam.cs.pawm.database.EventService
import it.unicam.cs.pawm.database.GameRoomService
import it.unicam.cs.pawm.database.GameService
import it.unicam.cs.pawm.database.RecordService
import it.unicam.cs.pawm.model.Event
import it.unicam.cs.pawm.model.Game

import it.unicam.cs.pawm.model.GameRoom
import it.unicam.cs.pawm.plugins.getIdParameter
import it.unicam.cs.pawm.utils.getIdFromToken

fun Route.gameRoomRouting() {
    route("/game-room") {

        //region Get
        get("/{id}") {
            val id = call.getIdParameter() ?: return@get
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

        get("{id}/records") {
            val id = call.parameters["id"]?.toInt() ?: run {
                call.respond(HttpStatusCode.BadRequest)
                return@get
            }
            val records = RecordService.getGameRoomRecords(id)
            call.respond(HttpStatusCode.OK, records)
        }

        get("{id}/verifiedRecords") {
            val id = call.parameters["id"]?.toInt() ?: run {
                call.respond(HttpStatusCode.BadRequest)
                return@get
            }
            val records = RecordService.getGameRoomVerifiedRecords(id)
            call.respond(HttpStatusCode.OK, records)
        }
        //endregion

        patch("/") {
            val id = call.getIdFromToken()
            val gameRoom = call.receive<GameRoom>()
            GameRoomService.update(id, gameRoom)
            call.respond(HttpStatusCode.OK)
        }

        delete("/") {
            val id = call.getIdFromToken()
            GameRoomService.delete(id)
            call.respond(HttpStatusCode.OK)
        }
    }
}