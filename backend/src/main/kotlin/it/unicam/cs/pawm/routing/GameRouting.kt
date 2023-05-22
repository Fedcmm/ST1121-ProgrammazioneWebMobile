package it.unicam.cs.pawm.routing

import io.ktor.http.*
import io.ktor.server.response.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.routing.*
import it.unicam.cs.pawm.database.GameService

import it.unicam.cs.pawm.model.Game

fun Route.gameRouting() {
    route("/game") {
        get("/{id}") {
            val id = call.parameters["id"]?.toInt() ?: throw IllegalArgumentException("Invalid ID")
            val game = GameService.read(id)

            if (game != null)
                call.respond(HttpStatusCode.OK, game)
            else
                call.respond(HttpStatusCode.NotFound)
        }

        post("/") {
            val game = call.receive<Game>()
            val id = GameService.add(game)
            call.respond(HttpStatusCode.Created, id)
        }

        patch("/{id") {
            val game = call.receive<Game>()
            GameService.update(game)
            call.respond(HttpStatusCode.OK)
        }

        delete("/{id}") {
            val id = call.parameters["id"]?.toInt() ?: throw IllegalArgumentException("Invalid ID")
            GameService.delete(id)
            call.respond(HttpStatusCode.OK)
        }
    }
}