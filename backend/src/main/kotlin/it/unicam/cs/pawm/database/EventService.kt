package it.unicam.cs.pawm.database

import it.unicam.cs.pawm.model.Event
import it.unicam.cs.pawm.model.EventTable
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq

object EventService : DatabaseService<Event, Int>(EventTable) {


    /**
     * Adds [newRecord] to the database and returns its id.
     */
    override suspend fun add(newRecord: Event): Int = dbQuery {
        val insert = EventTable.insert {
            it[name] = newRecord.name
            it[description] = newRecord.description
            it[gameRoom] = newRecord.gameRoom.id
            it[dateStart] = newRecord.dateStart
            it[dateEnd] = newRecord.dateEnd
        }
        insert[EventTable.id]
    }

    /**
     * Gets [id] from the database, or `null` if none was found.
     */
    override suspend fun read(id: Int): Event? = dbQuery {
        EventTable.select { EventTable.id eq id }.mapNotNull {
            Event(
                it[EventTable.id],
                it[EventTable.name],
                it[EventTable.description],
                GameRoomService.read(it[EventTable.gameRoom])!!,
                it[EventTable.dateStart],
                it[EventTable.dateEnd]
            )
        }.singleOrNull()
    }

    /**
     * Gets all event from the database.
     */
    override suspend fun readAll(): List<Event> = dbQuery {
        EventTable.selectAll()
    }.map {
        Event(
            it[EventTable.id],
            it[EventTable.name],
            it[EventTable.description],
            GameRoomService.read(it[EventTable.gameRoom])!!,
            it[EventTable.dateStart],
            it[EventTable.dateEnd]
        )
    }

    /**
     * Deletes [id] from the database.
     */
    override suspend fun delete(id: Int) {
        dbQuery {
            EventTable.deleteWhere { EventTable.id eq id }
        }
    }

    /**
     * Updates [upRecord] in the database.
     */
    override suspend fun update(upRecord: Event) {
        dbQuery {
            EventTable.update({ EventTable.id eq upRecord.id }) {
                it[name] = upRecord.name
                it[description] = upRecord.description
                it[gameRoom] = upRecord.gameRoom.id
                it[dateStart] = upRecord.dateStart
                it[dateEnd] = upRecord.dateEnd
            }
        }
    }
}