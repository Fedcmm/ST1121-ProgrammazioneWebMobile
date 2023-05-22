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
     * Add a [game] to the [gameRoom] games list.
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
     * Add a list of [games] to the [gameRoom] games list.
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
     * Gets all games of [gameRoom] from the database.
     */
    suspend fun read(gameRoom: Int): List<Game> = dbQuery {
        GameRoomGamesTable.select { GameRoomGamesTable.gameRoom eq gameRoom }.mapNotNull {
            GameService.read(it[GameRoomGamesTable.game])
        }//.toMutableList()
    }

    /**
     * Deletes  [game] of [gameRoom] games list.
     */
    suspend fun delete(gameRoom: Int, game: Int) {
        dbQuery {
            GameRoomGamesTable.deleteWhere {
                (this.gameRoom eq gameRoom) and (this.game eq game)
            }
        }
    }

    /**
     * Deletes all games from [gameRoom] games list.
     */
    suspend fun deleteAll(gameRoom: Int) {
        dbQuery {
            GameRoomGamesTable.deleteWhere { this.gameRoom eq gameRoom }
        }
    }

    /**
     * Updates [games] of [gameRoom] games list.
     */
    suspend fun update(gameRoom: Int, games: List<Game>) {
        deleteAll(gameRoom)
        dbQuery {
            GameRoomGamesTable.batchInsert(games) { game ->
                this[GameRoomGamesTable.gameRoom] = gameRoom
                this[GameRoomGamesTable.game] = game.id
            }
        }
    }

    private suspend fun <T> dbQuery(block: suspend () -> T) = DatabaseService.dbQuery(block)
}