package it.unicam.cs.pawm.model

import org.jetbrains.exposed.sql.Table

enum class GameType {
    ARCADE,
    DRIVING,
    FIGHTING,
    SHOOTING,
    SPORT,
    SIMULATION,
    MUSIC,
    PUZZLE,
    ADVENTURE
    //TODO add more types
}

object GameTypeTable : Table(){
    val gameType = enumeration("gameType", GameType::class)
}