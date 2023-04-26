package it.unicam.cs.pawm.model

import kotlinx.serialization.Serializable
import org.jetbrains.exposed.sql.Table

@Serializable
data class Record (
    val player: Player,
    val gameRoom: GameRoom,
    val game: Game,
    //TODO implement date
    val score: Int,
    val isVerified: Boolean
)

object RecordTable : Table(){
    val player = reference("player", PlayerTable.id)
    val gameRoom = reference("gameRoom", GameRoomTable.id)
    val game = reference("game", GameTable.id)
    //TODO implement date
    val score = integer("score")
    val isVerified = bool("isVerified")

    override val primaryKey = PrimaryKey(player, gameRoom)
}