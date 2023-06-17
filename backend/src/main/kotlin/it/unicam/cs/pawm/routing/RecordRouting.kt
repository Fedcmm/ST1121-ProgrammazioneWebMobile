package it.unicam.cs.pawm.routing

import io.ktor.http.*
import io.ktor.server.response.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.routing.*
import it.unicam.cs.pawm.database.RecordService

import it.unicam.cs.pawm.model.Record

fun Route.recordRouting() {
    route("/record") {
        get("/{id}") {
            val id = call.parameters["id"]?.toInt() ?: run {
                call.respond(HttpStatusCode.BadRequest)
                return@get
            }
            val record = RecordService.read(id)

            if (record != null)
                call.respond(HttpStatusCode.OK, record)
            else
                call.respond(HttpStatusCode.NotFound)
        }

        get("/all") {
            val records = RecordService.readAll()
            call.respond(HttpStatusCode.OK, records)
        }

        post("/") {
            val record = try {
                call.receive<Record>()
            } catch (e: Exception) {
                call.respond(HttpStatusCode.BadRequest, "Invalid record")
                return@post
            }

            RecordService.add(record)
            call.respond(HttpStatusCode.Created)
        }

        patch("/{id}") {
            val id = call.parameters["id"]?.toInt() ?: run {
                call.respond(HttpStatusCode.BadRequest)
                return@patch
            }
            val record = call.receive<Record>()

            RecordService.update(id, record)
            call.respond(HttpStatusCode.OK)
        }

        delete("/{id}") {
            val id = call.parameters["id"]?.toInt() ?: run {
                call.respond(HttpStatusCode.BadRequest)
                return@delete
            }

            RecordService.delete(id)
            call.respond(HttpStatusCode.OK)
        }
    }
}