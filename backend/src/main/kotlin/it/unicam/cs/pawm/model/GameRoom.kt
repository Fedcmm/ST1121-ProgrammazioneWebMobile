package it.unicam.cs.pawm.model

import kotlinx.serialization.Serializable
import org.jetbrains.exposed.sql.Table

@Serializable
data class GameRoom(
    val id: Int,
    val name: String,
    val email: String,
    val password: String,
    val games: List<Game>
)
object GameRoomTable : Table(){
    val id = integer("id").autoIncrement()
    val name = varchar("name", 50)
    val email = varchar("email", 50)
    val password = varchar("password", 50)
    val games = reference("games", GameTable.id)

    override val primaryKey = PrimaryKey(id)
}