package it.unicam.cs.pawm.database

import it.unicam.cs.pawm.model.Record
import it.unicam.cs.pawm.model.RecordID
import it.unicam.cs.pawm.model.RecordTable
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq

object RecordService : DatabaseService<Record, RecordID>(RecordTable) {

    override suspend fun add(newRecord: Record): RecordID = dbQuery {
        val insert = RecordTable.insert {
            it[player] = newRecord.player.id
            it[gameRoom] = newRecord.gameRoom.id
            it[game] = newRecord.game.id
            it[date] = newRecord.date
            it[score] = newRecord.score
            it[isVerified] = newRecord.isVerified
        }
        RecordID(insert[RecordTable.player], insert[RecordTable.gameRoom])
    }

    override suspend fun read(id: RecordID): Record? = dbQuery {
        RecordTable.select { (RecordTable.player eq id.player) and (RecordTable.gameRoom eq id.gameRoom) }.mapNotNull {
            Record(
                PlayerService.read(it[RecordTable.player])!!,
                GameRoomService.read(it[RecordTable.gameRoom])!!,
                GameService.read(it[RecordTable.game])!!,
                it[RecordTable.date],
                it[RecordTable.score],
                it[RecordTable.isVerified]
            )
        }.singleOrNull()
    }

    override suspend fun readAll(): List<Record> = dbQuery {
        RecordTable.selectAll().map {
            Record(
                PlayerService.read(it[RecordTable.player])!!,
                GameRoomService.read(it[RecordTable.gameRoom])!!,
                GameService.read(it[RecordTable.game])!!,
                it[RecordTable.date],
                it[RecordTable.score],
                it[RecordTable.isVerified]
            )
        }
    }

    override suspend fun delete(id: RecordID) {
        dbQuery {
            RecordTable.deleteWhere { (player eq id.player) and (gameRoom eq id.gameRoom) }
        }
    }

    override suspend fun update(id: RecordID, updRecord: Record) {
        dbQuery {
            RecordTable.update(
                { (RecordTable.player eq id.player) and (RecordTable.gameRoom eq id.gameRoom) }
            ) {
                it[game] = updRecord.game.id
                it[date] = updRecord.date
                it[score] = updRecord.score
                it[isVerified] = updRecord.isVerified
            }
        }
    }
}