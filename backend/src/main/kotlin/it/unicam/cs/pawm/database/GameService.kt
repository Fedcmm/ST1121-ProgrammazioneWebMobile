package it.unicam.cs.pawm.database

import it.unicam.cs.pawm.model.Game
import it.unicam.cs.pawm.model.GameTable
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq

object GameService : DatabaseService<Game, Int>(GameTable) {


    /**
     * Adds [newRecord] to the database and returns its id.
     */
    override suspend fun add(newRecord: Game): Int = dbQuery {
        val insert = GameTable.insert {
            it[name] = newRecord.name
            it[description] = newRecord.description
        }

        GameTypeService.addAll(insert[GameTable.id], newRecord.gameTypes)
        insert[GameTable.id]
    }

    /**
     * Gets [id] from the database, or `null` if none was found.
     */
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

    /**
     * Gets all records from the database.
     */
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

    /**
     * Deletes [id] from the database.
     */
    override suspend fun delete(id: Int) {
        GameTypeService.deleteAll(id)

        dbQuery {
            GameTable.deleteWhere { GameTable.id eq id }
        }
    }

    /**
     * Updates [upRecord] in the database.
     */
    override suspend fun update(upRecord: Game) {
        GameTypeService.update(upRecord.id, upRecord.gameTypes)

        dbQuery {
            GameTable.update({ GameTable.id eq upRecord.id }) {
                it[name] = upRecord.name
                it[description] = upRecord.description
            }
        }
    }
}