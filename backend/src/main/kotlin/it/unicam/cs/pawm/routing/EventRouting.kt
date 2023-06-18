package it.unicam.cs.pawm.routing

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import it.unicam.cs.pawm.database.EventService
import it.unicam.cs.pawm.model.Event
import it.unicam.cs.pawm.plugins.getIdParameter
import it.unicam.cs.pawm.utils.getIdFromToken

fun Route.eventRouting() {
    route("/event") {
        get("/{id}") {
            val id = call.parameters["id"]?.toInt() ?: run {
                call.respond(HttpStatusCode.BadRequest)
                return@get
            }
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
            val event = try {
                call.receive<Event>()
            } catch (e: Exception) {
                call.respond(HttpStatusCode.BadRequest, "Invalid event")
                return@post
            }

            val id = EventService.add(event)
            call.respond(HttpStatusCode.Created, id)
        }

        patch("/{id}") {
            val id = call.parameters["id"]?.toInt() ?: run {
                call.respond(HttpStatusCode.BadRequest)
                return@patch
            }
            val event = call.receive<Event>()

            EventService.update(id, event)
            call.respond(HttpStatusCode.OK)
        }

        delete("/{id}") {
            val id = call.getIdParameter() ?: return@delete

            val event = EventService.read(id) ?: run {
                call.respond(HttpStatusCode.NotFound, "Event not found")
                return@delete
            }
            if (event.gameRoom.id != call.getIdFromToken()) {
                call.respond(HttpStatusCode.Forbidden, "You can't delete this event")
                return@delete
            }

            EventService.delete(id)
            call.respond(HttpStatusCode.OK)
        }

        //Non so se funziona, ma teoricamente si
        data class DeleteEventsRequest(val events: List<Int>)

        delete("/{body}") {
            val request = call.receive<DeleteEventsRequest>()
            val events = request.events

            for (event in events){
                EventService.delete(event)
            }
            call.respond(HttpStatusCode.OK)
        }
    }
}