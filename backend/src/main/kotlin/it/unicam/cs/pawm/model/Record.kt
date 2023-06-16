package it.unicam.cs.pawm.model

import it.unicam.cs.pawm.database.GameRoomService
import it.unicam.cs.pawm.database.GameService
import it.unicam.cs.pawm.database.PlayerService
import kotlinx.serialization.Contextual
import kotlinx.serialization.Serializable
import org.jetbrains.exposed.sql.ResultRow
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
) {
    companion object {
        suspend fun fromQueryResult(row: ResultRow): Record = Record(
            row[RecordTable.id],
            PlayerService.read(row[RecordTable.player])!!,
            GameRoomService.read(row[RecordTable.gameRoom])!!,
            GameService.read(row[RecordTable.game])!!,
            row[RecordTable.date],
            row[RecordTable.score],
            row[RecordTable.isVerified]
        )
    }
}

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