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
    @Contextual val startDate: LocalDate,
    @Contextual val endDate: LocalDate,
    //Aggiungere altri campi
)

object EventTable : Table() {
    val id = integer("id").autoIncrement()
    val name = varchar("name", 50)
    val description = varchar("description", 50)
    val gameRoom = reference("gameRoom", GameRoomTable.id)
    val startDate = date("startDate")
    val endDate = date("endDate")

    override val primaryKey = PrimaryKey(id)
}