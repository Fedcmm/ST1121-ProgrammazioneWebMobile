package it.unicam.cs.pawm.model

import kotlinx.serialization.Contextual
import kotlinx.serialization.Serializable
import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.javatime.date
import java.time.LocalDate

@Serializable
data class Event(
    val id: Int,
    val name: String,
    val description: String,
    val gameRoom: GameRoom,
    @Contextual val dateStart: LocalDate,
    @Contextual val dateEnd: LocalDate,
    //Aggiungere altri campi
)

object EventTable : Table() {
    val id = integer("id").autoIncrement()
    val name = varchar("name", 50)
    val description = varchar("description", 50)
    val gameRoom = reference("gameRoom", GameRoomTable.id)
    val dateStart = date("dateStart")
    val dateEnd = date("dateEnd")

    override val primaryKey = PrimaryKey(id)
}