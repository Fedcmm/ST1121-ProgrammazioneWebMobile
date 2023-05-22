package it.unicam.cs.pawm

import io.ktor.server.application.*
import io.ktor.server.netty.*
import it.unicam.cs.pawm.plugins.*

fun main(args: Array<String>) = EngineMain.main(args)

fun Application.module() {
    configureAuthentication()
    configureSerialization()
    configureDatabases()
    configureHTTP()
    configureCORS()
    configureRouting()
}
