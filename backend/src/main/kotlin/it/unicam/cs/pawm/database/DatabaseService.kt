package it.unicam.cs.pawm.database

import kotlinx.coroutines.Dispatchers
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import org.jetbrains.exposed.sql.transactions.transaction

abstract class DatabaseService<T, ID>(schema: Table) {

    init {
        transaction(database) { SchemaUtils.create(schema) }
    }


    abstract suspend fun add(newRecord: T): ID

    abstract suspend fun read(id: ID): T?

    abstract suspend fun readAll(): List<T>

    abstract suspend fun update(updRecord: T)

    abstract suspend fun delete(id: ID)


    companion object {
        val database = Database.connect(
            url = "jdbc:mysql://db4free.net:3306/prog_web_mobile", // TODO: Url
            driver = "com.mysql.cj.jdbc.Driver",
            user = "prog_web_mobile",
            password = "adminadmin"
        )

        suspend fun <T> dbQuery(block: suspend () -> T): T =
            newSuspendedTransaction(Dispatchers.IO) { block() }
    }
}