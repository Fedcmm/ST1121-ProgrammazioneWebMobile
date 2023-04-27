package it.unicam.cs.pawm.model

import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.javatime.datetime
import java.time.LocalDateTime

data class Game(
    val id: Int,
    val name: String,
    val description: String,
    //Credo si implementi così la relazione uno a molti
    val gameTypes: List<GameType>
)

object GameTable : Table() {
    val id = integer("id").autoIncrement()
    val name = varchar("name", 50)
    val description = varchar("description", 50)
    //Credo si implementi così la relazione uno a molti
    val gameTypes = reference("gameType", GameTypeTable.gameType)

    override val primaryKey = PrimaryKey(id)
}