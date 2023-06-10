package it.unicam.cs.pawm.database

import it.unicam.cs.pawm.model.Player
import it.unicam.cs.pawm.model.PlayerTable
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq

object PlayerService : DatabaseService<Player, Int>(PlayerTable) {

    override suspend fun add(newRecord: Player): Int = dbQuery {
        PlayerTable.insert {
            it[name] = newRecord.name
            it[surname] = newRecord.surname
            it[email] = newRecord.email
            it[password] = newRecord.password
            it[passwordSalt] = newRecord.passwordSalt
        } get PlayerTable.id
    }

    override suspend fun read(id: Int): Player? = dbQuery {
        PlayerTable.select { PlayerTable.id eq id }.mapNotNull {
            Player(
                it[PlayerTable.id],
                it[PlayerTable.name],
                it[PlayerTable.surname],
                it[PlayerTable.email],
                it[PlayerTable.password],
                it[PlayerTable.passwordSalt]
            )
        }.singleOrNull()
    }

    override suspend fun readAll(): List<Player> = dbQuery {
        PlayerTable.selectAll().map {
            Player(
                it[PlayerTable.id],
                it[PlayerTable.name],
                it[PlayerTable.surname],
                it[PlayerTable.email],
                it[PlayerTable.password],
                it[PlayerTable.passwordSalt]
            )
        }
    }

    override suspend fun delete(id: Int) {
        dbQuery {
            PlayerTable.deleteWhere { PlayerTable.id eq id }
        }
    }

    override suspend fun update(id: Int, updRecord: Player) {
        dbQuery {
            PlayerTable.update({ PlayerTable.id eq id }) {
                it[name] = updRecord.name
                it[surname] = updRecord.surname
                it[email] = updRecord.email
                it[password] = updRecord.password
                it[passwordSalt] = updRecord.passwordSalt
            }
        }
    }

    suspend fun getPasswordSalt(email: String): String? = dbQuery {
        PlayerTable.select { PlayerTable.email eq email }.map { it[PlayerTable.passwordSalt] }.singleOrNull()
    }

    /**
     * Checks if the given credentials are valid and returns the id of the user, or `-1` on failure.
     */
    suspend fun checkCredentials(email: String, password: String): Int = dbQuery {
        PlayerTable.select { (PlayerTable.email eq email) and (PlayerTable.password eq password) }
            .map { it[PlayerTable.id] }.singleOrNull() ?: -1
    }

    /**
     * Checks if an account with the given [email] exists.
     */
    suspend fun accountExists(email: String): Boolean = dbQuery {
        PlayerTable.select { PlayerTable.email eq email }.count() == 1L
    }
}