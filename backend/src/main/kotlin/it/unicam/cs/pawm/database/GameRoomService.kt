package it.unicam.cs.pawm.database

import it.unicam.cs.pawm.model.GameRoom
import it.unicam.cs.pawm.model.GameRoomTable
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq

class GameRoomService : DatabaseService<GameRoom, Int>(GameRoomTable) {

    private val gameRoomGamesService = GameRoomGamesService()


    override suspend fun add(newRecord: GameRoom): Int = dbQuery {
        val insert = GameRoomTable.insert {
            it[name] = newRecord.name
            it[email] = newRecord.email
            it[password] = newRecord.password
        }

        gameRoomGamesService.addAll(insert[GameRoomTable.id], newRecord.games.map { it.id })
        insert[GameRoomTable.id]
    }

    override suspend fun read(id: Int): GameRoom? = dbQuery {
        GameRoomTable.select { GameRoomTable.id eq id }.mapNotNull {
            GameRoom(
                it[GameRoomTable.id],
                it[GameRoomTable.name],
                it[GameRoomTable.email],
                it[GameRoomTable.password],
                gameRoomGamesService.read(id)
            )
        }.singleOrNull()
    }

    override suspend fun readAll(): List<GameRoom> = dbQuery {
        GameRoomTable.selectAll().map {
            val id = it[GameRoomTable.id]
            GameRoom(
                id,
                it[GameRoomTable.name],
                it[GameRoomTable.email],
                it[GameRoomTable.password],
                gameRoomGamesService.read(id)
            )
        }
    }

    override suspend fun delete(id: Int) {
        gameRoomGamesService.deleteAll(id)

        dbQuery {
            GameRoomTable.deleteWhere { GameRoomTable.id eq id }
        }
    }

    override suspend fun update(updRecord: GameRoom) {
        dbQuery {
            GameRoomTable.update({ GameRoomTable.id eq updRecord.id }) {
                it[name] = updRecord.name
                it[email] = updRecord.email
                it[password] = updRecord.password
            }
        }
    }

    /**
     * Removes a [game] from the specified [gameRoom].
     */
    suspend fun removeGame(gameRoom: Int, game: Int) {
        gameRoomGamesService.delete(gameRoom, game)
    }
}