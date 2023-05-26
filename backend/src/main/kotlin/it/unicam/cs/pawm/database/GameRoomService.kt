package it.unicam.cs.pawm.database

import it.unicam.cs.pawm.model.GameRoom
import it.unicam.cs.pawm.model.GameRoomTable

import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq

object GameRoomService : DatabaseService<GameRoom, Int>(GameRoomTable) {

    override suspend fun add(newRecord: GameRoom): Int = dbQuery {
        val insert = GameRoomTable.insert {
            it[name] = newRecord.name
            it[email] = newRecord.email
            it[password] = newRecord.password
        }

        GameRoomGamesService.addAll(insert[GameRoomTable.id], newRecord.games.map { it.id })
        GameRoomEventsService.addAll(insert[GameRoomTable.id], newRecord.events.map { it.id })
        insert[GameRoomTable.id]
    }

    override suspend fun read(id: Int): GameRoom? = dbQuery {
        GameRoomTable.select { GameRoomTable.id eq id }.mapNotNull {
            GameRoom(
                it[GameRoomTable.id],
                it[GameRoomTable.name],
                it[GameRoomTable.email],
                it[GameRoomTable.password],
                GameRoomGamesService.read(id),
                GameRoomEventsService.read(id)
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
                GameRoomGamesService.read(id),
                GameRoomEventsService.read(id)
            )
        }
    }

    override suspend fun delete(id: Int) {
        GameRoomGamesService.deleteAll(id)
        GameRoomEventsService.deleteAll(id)

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
        GameRoomGamesService.delete(gameRoom, game)
    }

    /**
     * Removes all games from the specified [gameRoom].
     */
    suspend fun removeAllGames(gameRoom: Int) {
        GameRoomGamesService.deleteAll(gameRoom)
    }

    /**
     * Removes an [event] from the specified [gameRoom].
     */
    suspend fun removeEvent(gameRoom: Int, event: Int) {
        GameRoomEventsService.delete(gameRoom, event)
    }

    /**
     * Removes all events from the specified [gameRoom].
     */
    suspend fun removeAllEvents(gameRoom: Int) {
        GameRoomEventsService.deleteAll(gameRoom)
    }
}