package it.unicam.cs.pawm.routing

import io.ktor.http.*
import io.ktor.server.response.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.routing.*
import it.unicam.cs.pawm.database.PlayerService

import it.unicam.cs.pawm.model.Player

fun Route.playerRouting() {
    route("/player") {
        get("/{id}") {
            val id = call.parameters["id"]?.toInt() ?: throw IllegalArgumentException("Invalid ID")
            val player = PlayerService.read(id)

            if (player != null)
                call.respond(HttpStatusCode.OK, player)
            else
                call.respond(HttpStatusCode.NotFound)
        }

        post("/") {
            val player = call.receive<Player>()
            val id = PlayerService.add(player)
            call.respond(HttpStatusCode.Created, id)
        }

        patch("/{id") {
            val player = call.receive<Player>()
            PlayerService.update(player)
            call.respond(HttpStatusCode.OK)
        }

        delete("/{id}") {
            val id = call.parameters["id"]?.toInt() ?: throw IllegalArgumentException("Invalid ID")
            PlayerService.delete(id)
            call.respond(HttpStatusCode.OK)
        }
    }
}