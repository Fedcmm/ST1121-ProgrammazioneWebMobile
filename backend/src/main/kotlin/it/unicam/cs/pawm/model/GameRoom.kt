package it.unicam.cs.pawm.model

import kotlinx.serialization.Serializable
import org.jetbrains.exposed.sql.Table

@Serializable
data class GameRoom(
    val id: Int = -1,
    val name: String,
    val email: String,
    val password: String,
    val passwordSalt: String,
    val games: List<Game> = mutableListOf(),
    val events: List<Event> = mutableListOf()
    //Aggiungere altri campi
)

object GameRoomTable : Table() {
    val id = integer("id").autoIncrement()
    val name = varchar("name", 50)
    val email = varchar("email", 50).uniqueIndex()
    val password = char("password", 60)
    val passwordSalt = varchar("passwordSalt", 60)

    override val primaryKey = PrimaryKey(id)
}

object GameRoomGamesTable : Table() {
    val gameRoom = reference("gameRoom", GameRoomTable.id)
    val game = reference("game", GameTable.id)

    override val primaryKey = PrimaryKey(gameRoom, game)
}

object GameRoomEventsTable : Table() {
    val gameRoom = reference("gameRoom", GameRoomTable.id)
    val event = reference("event", EventTable.id)

    override val primaryKey = PrimaryKey(gameRoom, event)
}