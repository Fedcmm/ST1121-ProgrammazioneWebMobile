package it.unicam.cs.pawm.database

import it.unicam.cs.pawm.model.GameRoomRefreshTable
import it.unicam.cs.pawm.model.PlayerRefreshTable
import it.unicam.cs.pawm.model.RefreshToken
import it.unicam.cs.pawm.utils.REFRESH_DURATION
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.transactions.transaction
import java.time.Instant

object PlayerRefreshService {

    init {
        transaction { SchemaUtils.create(PlayerRefreshTable) }
    }


    suspend fun add(refreshToken: RefreshToken) {
        dbQuery {
            PlayerRefreshTable.insert {
                it[playerId] = refreshToken.userId
                it[token] = refreshToken.token
                it[expiration] = refreshToken.expiration
            }
        }
    }

    suspend fun read(id: Int, token: String): RefreshToken? = dbQuery {
        PlayerRefreshTable.select { (PlayerRefreshTable.playerId eq id) and (PlayerRefreshTable.token eq token) }.firstNotNullOfOrNull {
            RefreshToken(
                it[PlayerRefreshTable.playerId],
                it[PlayerRefreshTable.token],
                it[PlayerRefreshTable.expiration]
            )
        }
    }

    suspend fun update(id: Int, token: String) {
        dbQuery {
            PlayerRefreshTable.update({ (PlayerRefreshTable.playerId eq id) and (PlayerRefreshTable.token eq token) }) {
                it[this.token] = token
                it[expiration] = Instant.now().plusSeconds(REFRESH_DURATION).epochSecond
            }
        }
    }

    suspend fun delete(id: Int) {
        dbQuery {
            PlayerRefreshTable.deleteWhere { playerId eq id }
        }
    }
}

object GameRoomRefreshService {

    init {
        transaction { SchemaUtils.create(GameRoomRefreshTable) }
    }


    suspend fun add(refreshToken: RefreshToken) {
        dbQuery {
            GameRoomRefreshTable.insert {
                it[roomId] = refreshToken.userId
                it[token] = refreshToken.token
                it[expiration] = refreshToken.expiration
            }
        }
    }

    suspend fun read(id: Int, token: String): RefreshToken? = dbQuery {
        GameRoomRefreshTable.select { (GameRoomRefreshTable.roomId eq id) and (GameRoomRefreshTable.token eq token) }.firstNotNullOfOrNull {
            RefreshToken(
                it[GameRoomRefreshTable.roomId],
                it[GameRoomRefreshTable.token],
                it[GameRoomRefreshTable.expiration]
            )
        }
    }

    suspend fun update(id: Int, token: String) {
        dbQuery {
            GameRoomRefreshTable.update({ (GameRoomRefreshTable.roomId eq id) and (GameRoomRefreshTable.token eq token) }) {
                it[this.token] = token
                it[expiration] = Instant.now().plusSeconds(REFRESH_DURATION).epochSecond
            }
        }
    }

    suspend fun delete(id: Int) {
        dbQuery {
            GameRoomRefreshTable.deleteWhere { roomId eq id }
        }
    }
}