package it.unicam.cs.pawm.routing

import io.ktor.http.*
import io.ktor.server.response.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.routing.*
import it.unicam.cs.pawm.database.EventService

import it.unicam.cs.pawm.model.Event

fun Route.eventRouting() {

    route("/event") {
        get("/{id}") {
            val id = call.parameters["id"]?.toInt() ?: throw IllegalArgumentException("Invalid ID")
            val event = EventService.read(id)

            if (event != null)
                call.respond(HttpStatusCode.OK, event)
            else
                call.respond(HttpStatusCode.NotFound)
        }

        get("/all") {
            val events = EventService.readAll()
            call.respond(HttpStatusCode.OK, events)
        }

        post("/") {
            val event = call.receive<Event>()
            val id = EventService.add(event)
            call.respond(HttpStatusCode.Created, id)
        }

        patch("/{id}") {
            val event = call.receive<Event>()
            EventService.update(event)
            call.respond(HttpStatusCode.OK)
        }

        delete("/{id}") {
            val id = call.parameters["id"]?.toInt() ?: throw IllegalArgumentException("Invalid ID")
            EventService.delete(id)
            call.respond(HttpStatusCode.OK)
        }

    }
}