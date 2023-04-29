package it.unicam.cs.pawm.database

import kotlinx.coroutines.Dispatchers
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import org.jetbrains.exposed.sql.transactions.transaction

abstract class DatabaseService<T, ID>(schema: Table) {

    init {
        transaction { SchemaUtils.create(schema) }
    }


    abstract suspend fun add(newRecord: T): ID

    abstract suspend fun read(id: ID): T?

    abstract suspend fun readAll(): List<T>

    abstract suspend fun update(updRecord: T)

    abstract suspend fun delete(id: ID)


    companion object {
        suspend fun <T> dbQuery(block: suspend () -> T): T =
            newSuspendedTransaction(Dispatchers.IO) { block() }
    }
}