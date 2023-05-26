package it.unicam.cs.pawm.database

import it.unicam.cs.pawm.model.Event
import it.unicam.cs.pawm.model.GameRoomEventsTable
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.transactions.transaction

object GameRoomEventsService {

    init {
        transaction { SchemaUtils.create(GameRoomEventsTable) }
    }


    /**
     * Adds an [event] to the [gameRoom].
     */
    suspend fun add(gameRoom: Int, event: Int) {
        dbQuery {
            GameRoomEventsTable.insert {
                it[this.gameRoom] = gameRoom
                it[this.event] = event
            }
        }
    }

    /**
     * Adds a list of [events] to the [gameRoom].
     */
    suspend fun addAll(gameRoom: Int, events: List<Int>) {
        dbQuery {
            GameRoomEventsTable.batchInsert(events) { event ->
                this[GameRoomEventsTable.gameRoom] = gameRoom
                this[GameRoomEventsTable.event] = event
            }
        }
    }

    /**
     * Gets all the events of the [gameRoom].
     */
    suspend fun read(gameRoom: Int): List<Event> = dbQuery {
        GameRoomEventsTable.select { GameRoomEventsTable.gameRoom eq gameRoom }.mapNotNull {
            EventService.read(it[GameRoomEventsTable.event])
        }//.toMutableList()
    }

    /**
     * Deletes [event] from the [gameRoom].
     */
    suspend fun delete(gameRoom: Int, event: Int) {
        dbQuery {
            GameRoomEventsTable.deleteWhere {
                (this.gameRoom eq gameRoom) and (this.event eq event)
            }
        }
    }

    /**
     * Deletes all events from [gameRoom].
     */
    suspend fun deleteAll(gameRoom: Int) {
        dbQuery {
            GameRoomEventsTable.deleteWhere {
                this.gameRoom eq gameRoom
            }
        }
    }

    /**
     * Replaces the events of [gameRoom] with [events].
     */
    suspend fun update(gameRoom: Int, events: List<Event>) {
        deleteAll(gameRoom)
        addAll(gameRoom, events.map { it.id })
    }
}