package it.unicam.cs.pawm.database

import it.unicam.cs.pawm.model.*

import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq

object GameRoomService : DatabaseService<GameRoom, Int>(GameRoomTable) {

    /* TODO: implement salt
    suspend fun salt(email: String): String = dbQuery {

    }
    */

    override suspend fun add(newRecord: GameRoom): Int = dbQuery {
        val insert = GameRoomTable.insert {
            it[name] = newRecord.name
            it[email] = newRecord.email
            it[password] = newRecord.password
            it[passwordSalt] = newRecord.passwordSalt
        }

        insert[GameRoomTable.id]
    }

    override suspend fun read(id: Int): GameRoom? = dbQuery {
        GameRoomTable.select { GameRoomTable.id eq id }.mapNotNull {
            GameRoom(
                it[GameRoomTable.id],
                it[GameRoomTable.name],
                it[GameRoomTable.email],
                it[GameRoomTable.password],
                it[GameRoomTable.passwordSalt],
                it[GameRoomGamesTable.gameRoom].let { gameRoom ->
                    GameService.getGameRoomGames(gameRoom)
                },
                it[GameRoomEventsTable.gameRoom].let { gameRoom ->
                    EventService.getGameRoomEvents(gameRoom)
                },
                it[GameRoomRecordsTable.gameRoom].let { gameRoom ->
                    RecordService.getGameRoomRecords(gameRoom)
                }
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
                it[GameRoomTable.passwordSalt],
            )
        }
    }

    override suspend fun delete(id: Int) {

        dbQuery {
            GameRoomTable.deleteWhere { GameRoomTable.id eq id }
        }
    }

    override suspend fun update(id: Int, updRecord: GameRoom) {
        dbQuery {
            GameRoomTable.update({ GameRoomTable.id eq id }) {
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

    }

    /**
     * Removes an [event] from the specified [gameRoom].
     */
    suspend fun removeEvent(gameRoom: Int, event: Int) {
    }

    /**
     * Removes all events from the specified [gameRoom].
     */
    suspend fun removeAllEvents(gameRoom: Int) {
    }

    suspend fun getPasswordSalt(email: String): String? = dbQuery {
        GameRoomTable.select { GameRoomTable.email eq email }.map { it[GameRoomTable.passwordSalt] }.singleOrNull()
    }

    /**
     * Checks if the given credentials are valid and returns the id of the user, or `-1` on failure.
     */
    suspend fun checkCredentials(email: String, password: String): Int = dbQuery {
        GameRoomTable.select { (GameRoomTable.email eq email) and (GameRoomTable.password eq password) }
            .map { it[GameRoomTable.id] }.singleOrNull() ?: -1
    }

    /**
     * Checks if an account with the given [email] exists.
     */
    suspend fun accountExists(email: String): Boolean = dbQuery {
        GameRoomTable.select { GameRoomTable.email eq email }.count() == 1L
    }
}