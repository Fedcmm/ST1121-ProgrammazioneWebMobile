package it.unicam.cs.pawm.model

import it.unicam.cs.pawm.utils.LocalDateJsonSerializer
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
    @Serializable(with = LocalDateJsonSerializer::class) val startDate: LocalDate,
    @Serializable(with = LocalDateJsonSerializer::class) val endDate: LocalDate,
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