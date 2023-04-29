package it.unicam.cs.pawm.database

import it.unicam.cs.pawm.model.Game
import it.unicam.cs.pawm.model.GameRoomGamesTable
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.transactions.transaction

class GameRoomGamesService {

    private val gameService = GameService()


    init {
        transaction { SchemaUtils.create(GameRoomGamesTable) }
    }


    suspend fun add(gameRoom: Int, game: Int) {
        dbQuery {
            GameRoomGamesTable.insert {
                it[this.gameRoom] = gameRoom
                it[this.game] = game
            }
        }
    }

    suspend fun addAll(gameRoom: Int, games: List<Int>) {
        dbQuery {
            GameRoomGamesTable.batchInsert(games) { game ->
                this[GameRoomGamesTable.gameRoom] = gameRoom
                this[GameRoomGamesTable.game] = game
            }
        }
    }

    suspend fun read(gameRoom: Int): List<Game> = dbQuery {
        GameRoomGamesTable.select { GameRoomGamesTable.gameRoom eq gameRoom }.mapNotNull {
            gameService.read(it[GameRoomGamesTable.game])
        }//.toMutableList()
    }

    suspend fun delete(gameRoom: Int, game: Int) {
        dbQuery {
            GameRoomGamesTable.deleteWhere {
                (this.gameRoom eq gameRoom) and (this.game eq game)
            }
        }
    }

    suspend fun deleteAll(gameRoom: Int) {
        dbQuery {
            GameRoomGamesTable.deleteWhere { this.gameRoom eq gameRoom }
        }
    }

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