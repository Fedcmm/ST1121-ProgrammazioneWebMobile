package it.unicam.cs.pawm.model

import kotlinx.serialization.Serializable
import org.jetbrains.exposed.sql.Table

@Serializable
data class Game(
    val id: Int,
    val name: String,
    val description: String,
    val gameTypes: List<GameType>
    //Aggiungere altri campi
)

object GameTable : Table() {
    val id = integer("id").autoIncrement()
    val name = varchar("name", 50)
    val description = varchar("description", 50)

    override val primaryKey = PrimaryKey(id)
}