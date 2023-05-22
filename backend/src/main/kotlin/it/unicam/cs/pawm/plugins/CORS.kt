package it.unicam.cs.pawm.plugins

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.plugins.cors.routing.*

fun Application.configureCORS() {
    install(CORS) {
        anyHost()
        allowMethod(HttpMethod.Post)
        allowHeader(HttpHeaders.ContentType)
        maxAgeInSeconds = 3600
        //allowHost("localhost:4200")
    }
}