package it.unicam.cs.pawm.model

import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.javatime.datetime
import java.time.LocalDate

data class Record (
    val player: Player,
    val gameRoom: GameRoom,
    val game: Game,
    val date: LocalDate,
    val score: Int,
    val isVerified: Boolean
)

object RecordTable : Table(){
    private val player = reference("player", PlayerTable.id)
    private val gameRoom = reference("gameRoom", GameRoomTable.id)
    val game = reference("game", GameTable.id)
    val date = datetime("date")
    val score = integer("score")
    val isVerified = bool("isVerified")

    override val primaryKey = PrimaryKey(player, gameRoom)
}