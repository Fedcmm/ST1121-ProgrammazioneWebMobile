package it.unicam.cs.pawm.database

import it.unicam.cs.pawm.model.Record
import it.unicam.cs.pawm.model.RecordTable
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq

object RecordService : DatabaseService<Record, Int>(RecordTable) {

    override suspend fun add(newRecord: Record): Int = dbQuery {
        val insert = RecordTable.insert {
            it[player] = newRecord.player.id
            it[gameRoom] = newRecord.gameRoom.id
            it[game] = newRecord.game.id
            it[date] = newRecord.date
            it[score] = newRecord.score
            it[isVerified] = newRecord.isVerified
        }
        insert[RecordTable.id]
    }

    override suspend fun readAll(): List<Record> = dbQuery {
        RecordTable.selectAll().map {
            Record.fromQueryResult(it)
        }
    }

    override suspend fun read(id: Int): Record? = dbQuery {
        RecordTable.select {
            (RecordTable.id eq id)
        }.mapNotNull {
            Record.fromQueryResult(it)
        }.singleOrNull()
    }

    suspend fun getGameRoomRecords(gameRoomId: Int): List<Record> = dbQuery {
        RecordTable.select {
            (RecordTable.gameRoom eq gameRoomId)
        }.mapNotNull {
            Record.fromQueryResult(it)
        }
    }

    suspend fun getPlayerRecords(playerId: Int): List<Record> = dbQuery {
        RecordTable.select {
            (RecordTable.player eq playerId)
        }.mapNotNull {
            Record.fromQueryResult(it)
        }
    }

    suspend fun getGameRoomVerifiedRecords(gameRoomId: Int): List<Record> = dbQuery {
        RecordTable.select {
            (RecordTable.gameRoom eq gameRoomId) and (RecordTable.isVerified eq true)
        }.mapNotNull {
            Record.fromQueryResult(it)
        }
    }

    suspend fun getPlayerVerifiedRecords(playerId: Int): List<Record> = dbQuery {
        RecordTable.select {
            (RecordTable.player eq playerId) and (RecordTable.isVerified eq true)
        }.mapNotNull {
            Record.fromQueryResult(it)
        }
    }

    override suspend fun delete(id: Int) {
        dbQuery {
            RecordTable.deleteWhere { RecordTable.id eq id }
        }
    }

    override suspend fun update(id: Int, updRecord: Record) {
        dbQuery {
            RecordTable.update(
                { RecordTable.id eq id }
            ) {
                it[game] = updRecord.game.id
                it[date] = updRecord.date
                it[score] = updRecord.score
                it[isVerified] = updRecord.isVerified
            }
        }
    }
}