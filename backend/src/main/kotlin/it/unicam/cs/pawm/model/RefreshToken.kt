package it.unicam.cs.pawm.model

import org.jetbrains.exposed.sql.Table

data class RefreshToken(
    val userId: Int,
    val token: String,
    val expiration: Long
)

object PlayerRefreshTable : Table() {
    val playerId = reference("playerId", PlayerTable.id)
    val token = varchar("token", 300)
    val expiration = long("expiration")

    override val primaryKey = PrimaryKey(playerId)
}

object GameRoomRefreshTable : Table() {
    val roomId = reference("roomId", GameRoomTable.id)
    val token = varchar("token", 300)
    val expiration = long("expiration")

    override val primaryKey = PrimaryKey(roomId)
}