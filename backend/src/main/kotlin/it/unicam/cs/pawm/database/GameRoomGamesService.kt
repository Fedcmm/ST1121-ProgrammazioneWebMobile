package it.unicam.cs.pawm.database

import it.unicam.cs.pawm.model.Game
import it.unicam.cs.pawm.model.GameRoomGamesTable
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.transactions.transaction

object GameRoomGamesService {

    init {
        transaction { SchemaUtils.create(GameRoomGamesTable) }
    }


    /**
     * Adds a [game] to the [gameRoom].
     */
    suspend fun add(gameRoom: Int, game: Int) {
        dbQuery {
            GameRoomGamesTable.insert {
                it[this.gameRoom] = gameRoom
                it[this.game] = game
            }
        }
    }

    /**
     * Adds a list of [games] to the [gameRoom].
     */
    suspend fun addAll(gameRoom: Int, games: List<Int>) {
        dbQuery {
            GameRoomGamesTable.batchInsert(games) { game ->
                this[GameRoomGamesTable.gameRoom] = gameRoom
                this[GameRoomGamesTable.game] = game
            }
        }
    }

    /**
     * Gets all the games of the [gameRoom].
     */
    suspend fun read(gameRoom: Int): List<Game> = dbQuery {
        GameRoomGamesTable.select { GameRoomGamesTable.gameRoom eq gameRoom }.mapNotNull {
            GameService.read(it[GameRoomGamesTable.game])
        }//.toMutableList()
    }

    /**
     * Deletes [game] from the [gameRoom].
     */
    suspend fun delete(gameRoom: Int, game: Int) {
        dbQuery {
            GameRoomGamesTable.deleteWhere {
                (this.gameRoom eq gameRoom) and (this.game eq game)
            }
        }
    }

    /**
     * Deletes all games from [gameRoom].
     */
    suspend fun deleteAll(gameRoom: Int) {
        dbQuery {
            GameRoomGamesTable.deleteWhere { this.gameRoom eq gameRoom }
        }
    }

    /**
     * Replaces the games of [gameRoom] with [games].
     */
    suspend fun update(gameRoom: Int, games: List<Game>) {
        deleteAll(gameRoom)
        addAll(gameRoom, games.map { it.id })
    }
}