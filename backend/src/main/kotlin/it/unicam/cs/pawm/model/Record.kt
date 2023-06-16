package it.unicam.cs.pawm.model

import kotlinx.serialization.Contextual
import kotlinx.serialization.Serializable
import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.javatime.date
import java.time.LocalDate

@Serializable
data class Record(
    val id: Int,
    val player: Player,
    val gameRoom: GameRoom,
    val game: Game,
    @Contextual val date: LocalDate,
    val score: Int,
    val isVerified: Boolean
)

object RecordTable : Table() {
    val id = integer("id").autoIncrement()
    val player = reference("player", PlayerTable.id)
    val gameRoom = reference("gameRoom", GameRoomTable.id)
    val game = reference("game", GameTable.id)
    val date = date("date")
    val score = integer("score")
    val isVerified = bool("isVerified")

    override val primaryKey = PrimaryKey(id)
}