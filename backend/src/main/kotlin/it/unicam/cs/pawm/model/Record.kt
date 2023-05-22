package it.unicam.cs.pawm.model

import kotlinx.serialization.Contextual
import kotlinx.serialization.Serializable
import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.javatime.datetime
import java.time.LocalDateTime

@Serializable
data class Record(
    val recordID: RecordID,
    val game: Game,
    /*@Serializable(with = )*/ @Contextual val date: LocalDateTime, // TODO: Test
    val score: Int,
    val isVerified: Boolean
)

@Serializable
data class RecordID(val player: Int, val gameRoom: Int)

object RecordTable : Table() {
    val player = reference("player", PlayerTable.id)
    val gameRoom = reference("gameRoom", GameRoomTable.id)
    val game = reference("game", GameTable.id)
    val date = datetime("date")
    val score = integer("score")
    val isVerified = bool("isVerified")

    override val primaryKey = PrimaryKey(player, gameRoom)
}