package it.unicam.cs.pawm.model

import org.jetbrains.exposed.sql.Table

@Suppress("unused")
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
}

object GameTypeTable : Table() {
    val game = reference("game", GameTable.id)
    val gameType = enumeration("gameType", GameType::class)

    override val primaryKey = PrimaryKey(game, gameType)
}