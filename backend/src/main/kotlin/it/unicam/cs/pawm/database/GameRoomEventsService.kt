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
     * Add a [event] to the [gameRoom] events list.
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
     * Add a list of [events] to the [gameRoom] events list.
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
     * Gets all events of [gameRoom] from the database.
     */
    suspend fun read(gameRoom: Int): List<Event> = dbQuery {
        GameRoomEventsTable.select { GameRoomEventsTable.gameRoom eq gameRoom }.mapNotNull {
            EventService.read(it[GameRoomEventsTable.event])
        }//.toMutableList()
    }

    /**
     * Deletes [event] of [gameRoom] from the database.
     */
    suspend fun delete(gameRoom: Int, event: Int) {
        dbQuery {
            GameRoomEventsTable.deleteWhere {
                (this.gameRoom eq gameRoom) and (this.event eq event)
            }
        }
    }

    /**
     * Deletes all event from [gameRoom] events list.
     */
    suspend fun deleteAll(gameRoom: Int) {
        dbQuery {
            GameRoomEventsTable.deleteWhere {
                this.gameRoom eq gameRoom
            }
        }
    }

    /**
     * Updates [event] of [gameRoom] events list.
     */
    suspend fun update(gameRoom: Int, event: List<Event>) {
        deleteAll(gameRoom)
        dbQuery {
            GameRoomEventsTable.batchInsert(event) { event ->
                this[GameRoomEventsTable.gameRoom] = gameRoom
                this[GameRoomEventsTable.event] = event.id
            }
        }
    }

    /**
     * Executes the specified [block] within a database transaction.
     */
    private suspend fun <T> dbQuery(block: suspend () -> T): T = DatabaseService.dbQuery(block)
}