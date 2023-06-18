package it.unicam.cs.pawm.routing

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import it.unicam.cs.pawm.database.PlayerService
import it.unicam.cs.pawm.database.RecordService
import it.unicam.cs.pawm.model.Player
import it.unicam.cs.pawm.utils.getIdFromToken

fun Route.playerRouting() {
    route("/player") {
        //region Get
        get("/{id}") {
            val id = call.parameters["id"]?.toInt() ?: run {
                call.respond(HttpStatusCode.BadRequest)
                return@get
            }
            val player = PlayerService.read(id)

            if (player != null)
                call.respond(HttpStatusCode.OK, player)
            else
                call.respond(HttpStatusCode.NotFound)
        }

        get("/all") {
            val players = PlayerService.readAll()
            call.respond(HttpStatusCode.OK, players)
        }

        get("/{id}/records") {
            val id = call.parameters["id"]?.toInt() ?: run {
                call.respond(HttpStatusCode.BadRequest)
                return@get
            }
            val records = RecordService.getPlayerRecords(id)
            call.respond(HttpStatusCode.OK, records)
        }

        get("/{id}/verifiedRecords") {
            val id = call.parameters["id"]?.toInt() ?: run {
                call.respond(HttpStatusCode.BadRequest)
                return@get
            }
            val records = RecordService.getPlayerVerifiedRecords(id)
            call.respond(HttpStatusCode.OK, records)
        }
        //endregion

        patch("/") {
            val id = call.getIdFromToken()
            val player = call.receive<Player>()
            PlayerService.update(id, player)
            call.respond(HttpStatusCode.OK)
        }

        delete("/") {
            val id = call.getIdFromToken()
            PlayerService.delete(id)
            call.respond(HttpStatusCode.OK)
        }
    }
}