package it.unicam.cs.pawm.routing

import io.ktor.http.*
import io.ktor.server.response.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.routing.*
import it.unicam.cs.pawm.database.RecordService

import it.unicam.cs.pawm.model.Record
import it.unicam.cs.pawm.plugins.getIdParameter
import it.unicam.cs.pawm.utils.getIdFromToken

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

        patch("/{id}/verify") {
            val id = call.parameters["id"]?.toInt() ?: run {
                call.respond(HttpStatusCode.BadRequest)
                return@patch
            }

            RecordService.verifyRecord(id)
            call.respond(HttpStatusCode.OK)
        }

        delete("/{id}") {
            val id = call.getIdParameter() ?: return@delete

            val record = RecordService.read(id) ?: run {
                call.respond(HttpStatusCode.NotFound, "Record not found")
                return@delete
            }
            val userId = call.getIdFromToken()
            if (record.player.id != userId || record.gameRoom.id != userId) {
                call.respond(HttpStatusCode.Forbidden, "You can't delete this record")
                return@delete
            }

            RecordService.delete(id)
            call.respond(HttpStatusCode.OK)
        }

        //Non so se funziona, ma teoricamente si
        data class DeleteRecordsRequest(val records: List<Int>)

        delete("/{body}") {
            val request = call.receive<DeleteRecordsRequest>()
            val records = request.records

            for (record in records){
                RecordService.delete(record)
            }
            call.respond(HttpStatusCode.OK)
        }
    }
}