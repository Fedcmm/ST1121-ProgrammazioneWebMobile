package it.unicam.cs.pawm.database

import it.unicam.cs.pawm.model.Player
import it.unicam.cs.pawm.model.PlayerTable
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq

object PlayerService : DatabaseService<Player, Int>(PlayerTable) {

    /**
     * Adds a new [newRecord] to the database and returns its id.
     */
    override suspend fun add(newRecord: Player): Int = dbQuery {
        PlayerTable.insert {
            it[name] = newRecord.name
            it[surname] = newRecord.surname
            it[email] = newRecord.email
            it[password] = newRecord.password
        } get PlayerTable.id
    }

    /**
     * Gets the record with the specified [id] from the database, or `null` if none was found.
     */
    override suspend fun read(id: Int): Player? = dbQuery {
        PlayerTable.select { PlayerTable.id eq id }.mapNotNull {
            Player(
                it[PlayerTable.id],
                it[PlayerTable.name],
                it[PlayerTable.surname],
                it[PlayerTable.email],
                it[PlayerTable.password]
            )
        }.singleOrNull()
    }

    /**
     * Gets all player from the database.
     */
    override suspend fun readAll(): List<Player> = dbQuery {
        PlayerTable.selectAll().map {
            Player(
                it[PlayerTable.id],
                it[PlayerTable.name],
                it[PlayerTable.surname],
                it[PlayerTable.email],
                it[PlayerTable.password]
            )
        }
    }

    /**
     * Deletes [id] from the database.
     */
    override suspend fun delete(id: Int) {
        dbQuery {
            PlayerTable.deleteWhere { PlayerTable.id eq id }
        }
    }

    /**
     * Updates [updRecord] in the database.
     */
    override suspend fun update(updRecord: Player) {
        dbQuery {
            PlayerTable.update({ PlayerTable.id eq updRecord.id }) {
                it[name] = updRecord.name
                it[surname] = updRecord.surname
                it[email] = updRecord.email
                it[password] = updRecord.password
            }
        }
    }

    /**
     * Checks if the credentials are valid.
     */
    suspend fun checkCredentials(email: String, password: String): Boolean = dbQuery {
        PlayerTable.select { (PlayerTable.email eq email) and (PlayerTable.password eq password) }.count() == 1L
    }

    /**
     * Checks if the email is already in use.
     */
    suspend fun accountExists(email: String): Boolean = dbQuery {
        PlayerTable.select { PlayerTable.email eq email }.count() == 1L
    }
}