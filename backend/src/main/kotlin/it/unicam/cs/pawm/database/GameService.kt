package it.unicam.cs.pawm.database

import it.unicam.cs.pawm.model.Game
import it.unicam.cs.pawm.model.GameTable
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq

class GameService : DatabaseService<Game, Int>(GameTable) {

    private val gameTypeService = GameTypeService()


    override suspend fun add(newRecord: Game): Int = dbQuery {
        val insert = GameTable.insert {
            it[name] = newRecord.name
            it[description] = newRecord.description
        }

        gameTypeService.addAll(insert[GameTable.id], newRecord.gameTypes)
        insert[GameTable.id]
    }

    override suspend fun read(id: Int): Game? = dbQuery {
        GameTable.select { GameTable.id eq id }.mapNotNull {
            Game(
                it[GameTable.id],
                it[GameTable.name],
                it[GameTable.description],
                gameTypeService.read(id)
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
                gameTypeService.read(id)
            )
        }
    }

    override suspend fun delete(id: Int) {
        gameTypeService.deleteAll(id)

        dbQuery {
            GameTable.deleteWhere { GameTable.id eq id }
        }
    }

    override suspend fun update(updRecord: Game) {
        gameTypeService.update(updRecord.id, updRecord.gameTypes)

        dbQuery {
            GameTable.update({ GameTable.id eq updRecord.id }) {
                it[name] = updRecord.name
                it[description] = updRecord.description
            }
        }
    }
}