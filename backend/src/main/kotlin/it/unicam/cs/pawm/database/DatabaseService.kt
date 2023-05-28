package it.unicam.cs.pawm.database

import kotlinx.coroutines.Dispatchers
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import org.jetbrains.exposed.sql.transactions.transaction

/**
 * Base class for interacting with a database table, has initialization and method declarations.
 */
abstract class DatabaseService<T, ID>(schema: Table) {

    init {
        transaction { SchemaUtils.create(schema) }
    }


    /**
     * Adds [newRecord] to the table and returns its id.
     */
    abstract suspend fun add(newRecord: T): ID

    /**
     * Gets the record with the specified [id] from the table, or `null` if none was found.
     */
    abstract suspend fun read(id: ID): T?

    /**
     * Gets all the records in this table.
     */
    abstract suspend fun readAll(): List<T>

    /**
     * Deletes the record with the specified [id] from the table.
     */
    abstract suspend fun delete(id: ID)

    /**
     * Updates the record with the specified [id] with the values of [updRecord].
     */
    abstract suspend fun update(id: ID, updRecord: T)
}

/**
 * Executes the statement [block] against the database.
 */
suspend fun <T> dbQuery(block: suspend () -> T): T =
    newSuspendedTransaction(Dispatchers.IO) { block() }