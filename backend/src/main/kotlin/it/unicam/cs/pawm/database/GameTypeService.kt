package it.unicam.cs.pawm.database

import it.unicam.cs.pawm.model.GameType
import it.unicam.cs.pawm.model.GameTypeTable
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.transactions.transaction

object GameTypeService {

    init {
        transaction { SchemaUtils.create(GameTypeTable) }
    }


    /**
     * Adds a [gameType] to the specified [game].
     */
    suspend fun add(game: Int, gameType: GameType) {
        dbQuery {
            GameTypeTable.insert {
                it[this.game] = game
                it[this.gameType] = gameType
            }
        }
    }

    /**
     * Adds a list of [gameTypes] to the specified [game].
     */
    suspend fun addAll(game: Int, gameTypes: List<GameType>) {
        dbQuery {
            GameTypeTable.batchInsert(gameTypes) { gameType ->
                this[GameTypeTable.game] = game
                this[GameTypeTable.gameType] = gameType
            }
        }
    }

    /**
     * Gets all the game types of [game].
     */
    suspend fun read(game: Int): List<GameType> = dbQuery {
        GameTypeTable.select { GameTypeTable.game eq game }.mapNotNull {
            it[GameTypeTable.gameType]
        }
    }

    /**
     * Removes [gameType] from [game].
     */
    suspend fun delete(game: Int, gameType: GameType) {
        dbQuery {
            GameTypeTable.deleteWhere {
                (this.game eq game) and (this.gameType eq gameType)
            }
        }
    }

    /**
     * Removes all the game types from [game].
     */
    suspend fun deleteAll(game: Int) {
        dbQuery {
            GameTypeTable.deleteWhere { this.game eq game }
        }
    }

    /**
     * Replaces the game types of [game] with [gameTypes].
     */
    suspend fun update(game: Int, gameTypes: List<GameType>) {
        deleteAll(game)
        addAll(game, gameTypes)
    }
}