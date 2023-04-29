package it.unicam.cs.pawm.model

import org.jetbrains.exposed.sql.Table

//@Serializable
data class Player(
    val id: Int,
    val name: String,
    val surname: String,
    val email: String,
    val password: String
)

object PlayerTable : Table() {
    val id = integer("id").autoIncrement()
    val name = varchar("name", 50)
    val surname = varchar("surname", 50)
    val email = varchar("email", 50)
    val password = varchar("password", 50)

    override val primaryKey = PrimaryKey(id)
}