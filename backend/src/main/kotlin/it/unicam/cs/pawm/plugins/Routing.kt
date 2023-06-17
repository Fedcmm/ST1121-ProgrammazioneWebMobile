package it.unicam.cs.pawm.plugins

import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.routing.*
import it.unicam.cs.pawm.routing.*

fun Application.configureRouting() {
    routing {
        authenticationRouting()

        authenticate("jwt-access") {
            playerRouting()
            gameRoomRouting()
            gameRouting()
            eventRouting()
            recordRouting()
        }
    }
}