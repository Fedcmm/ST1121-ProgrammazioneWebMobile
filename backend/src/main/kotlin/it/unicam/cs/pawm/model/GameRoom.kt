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
)

object GameRoomTable : Table() {
    val id = integer("id").autoIncrement()
    val name = varchar("name", 50)
    val email = varchar("email", 50).uniqueIndex()
    val password = char("password", 60)
    val passwordSalt = varchar("passwordSalt", 60)

    override val primaryKey = PrimaryKey(id)
}