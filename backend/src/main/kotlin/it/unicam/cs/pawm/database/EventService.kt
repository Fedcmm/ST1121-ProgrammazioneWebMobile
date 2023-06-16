package it.unicam.cs.pawm.database

import it.unicam.cs.pawm.model.Event
import it.unicam.cs.pawm.model.EventTable
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq

object EventService : DatabaseService<Event, Int>(EventTable) {

    override suspend fun add(newRecord: Event): Int = dbQuery {
        val insert = EventTable.insert {
            it[name] = newRecord.name
            it[description] = newRecord.description
            it[gameRoom] = newRecord.gameRoom.id
            it[startDate] = newRecord.startDate
            it[endDate] = newRecord.endDate
        }
        insert[EventTable.id]
    }

    override suspend fun read(id: Int): Event? = dbQuery {
        EventTable.select { EventTable.id eq id }.mapNotNull {
            Event(
                it[EventTable.id],
                it[EventTable.name],
                it[EventTable.description],
                GameRoomService.read(it[EventTable.gameRoom])!!,
                it[EventTable.startDate],
                it[EventTable.endDate]
            )
        }.singleOrNull()
    }

    override suspend fun readAll(): List<Event> = dbQuery {
        EventTable.selectAll().map {
            Event(
                it[EventTable.id],
                it[EventTable.name],
                it[EventTable.description],
                GameRoomService.read(it[EventTable.gameRoom])!!,
                it[EventTable.startDate],
                it[EventTable.endDate]
            )
        }
    }

    suspend fun getGameRoomEvents(gameRoomId: Int): List<Event> = dbQuery {
        EventTable.select { EventTable.gameRoom eq gameRoomId }.map {
            Event(
                it[EventTable.id],
                it[EventTable.name],
                it[EventTable.description],
                GameRoomService.read(it[EventTable.gameRoom])!!,
                it[EventTable.startDate],
                it[EventTable.endDate]
            )
        }
    }

    override suspend fun delete(id: Int) {
        dbQuery {
            EventTable.deleteWhere { EventTable.id eq id }
        }
    }

    override suspend fun update(id: Int, updRecord: Event) {
        dbQuery {
            EventTable.update({ EventTable.id eq id }) {
                it[name] = updRecord.name
                it[description] = updRecord.description
                it[gameRoom] = updRecord.gameRoom.id
                it[startDate] = updRecord.startDate
                it[endDate] = updRecord.endDate
            }
        }
    }
}