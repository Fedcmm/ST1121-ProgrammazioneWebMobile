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
            val record = call.receive<Record>()
            val id = RecordService.add(record)
            call.respond(HttpStatusCode.Created, id)
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