package it.unicam.cs.pawm.plugins

import io.ktor.server.routing.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import it.unicam.cs.pawm.routing.*

fun Application.configureRouting() {
    routing {
        authenticationRouting()

        authenticate("jwt-access") {
            playerRouting()
            gameRoomRouting()
            gameRouting()
            eventRouting()
        }
    }
}