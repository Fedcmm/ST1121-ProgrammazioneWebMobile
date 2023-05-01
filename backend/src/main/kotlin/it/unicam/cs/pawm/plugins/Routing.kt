package it.unicam.cs.pawm.plugins

import io.ktor.server.routing.*
import io.ktor.server.application.*
import it.unicam.cs.pawm.routing.authenticationRouting

fun Application.configureRouting() {
    routing {
        authenticationRouting()
    }
}
