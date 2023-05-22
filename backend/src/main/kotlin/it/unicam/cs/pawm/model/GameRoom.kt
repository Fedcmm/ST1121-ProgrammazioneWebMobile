package it.unicam.cs.pawm.model

import kotlinx.serialization.Contextual
import kotlinx.serialization.Serializable
import org.jetbrains.exposed.sql.Table

@Serializable
data class GameRoom(
    val id: Int,
    val name: String,
    val email: String,
    val password: String,
    @Contextual val games: List<Game> = mutableListOf(),
    @Contextual val events: List<Event> = mutableListOf()
    //Aggiungere altri campi
)

object GameRoomTable : Table() {
    val id = integer("id").autoIncrement()
    val name = varchar("name", 50)
    val email = varchar("email", 50)
    val password = varchar("password", 50)

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