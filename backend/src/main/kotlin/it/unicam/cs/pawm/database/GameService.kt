package it.unicam.cs.pawm.database

import it.unicam.cs.pawm.model.Game
import it.unicam.cs.pawm.model.GameRoomGamesTable
import it.unicam.cs.pawm.model.GameTable
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq

object GameService : DatabaseService<Game, Int>(GameTable) {

    override suspend fun add(newRecord: Game): Int = dbQuery {
        val insert = GameTable.insert {
            it[name] = newRecord.name
            it[description] = newRecord.description
        }

        GameTypeService.addAll(insert[GameTable.id], newRecord.gameTypes)
        insert[GameTable.id]
    }

    override suspend fun read(id: Int): Game? = dbQuery {
        GameTable.select { GameTable.id eq id }.mapNotNull {
            Game(
                it[GameTable.id],
                it[GameTable.name],
                it[GameTable.description],
                GameTypeService.read(id)
            )
        }.singleOrNull()
    }

    override suspend fun readAll(): List<Game> = dbQuery {
        GameTable.selectAll().map {
            val id = it[GameTable.id]
            Game(
                id,
                it[GameTable.name],
                it[GameTable.description],
                GameTypeService.read(id)
            )
        }
    }

    suspend fun getGameRoomGames(gameRoomId: Int): List<Game> = dbQuery {
        GameRoomGamesTable.select { GameRoomGamesTable.gameRoom eq gameRoomId }.mapNotNull {
            GameService.read(it[GameRoomGamesTable.game])
        }
    }

    override suspend fun delete(id: Int) {
        GameTypeService.deleteAll(id)

        dbQuery {
            GameTable.deleteWhere { GameTable.id eq id }
        }
    }

    override suspend fun update(id: Int, updRecord: Game) {
        GameTypeService.update(id, updRecord.gameTypes)

        dbQuery {
            GameTable.update({ GameTable.id eq id }) {
                it[name] = updRecord.name
                it[description] = updRecord.description
            }
        }
    }
}