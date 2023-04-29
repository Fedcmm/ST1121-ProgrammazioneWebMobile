package it.unicam.cs.pawm.plugins

import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.transactions.TransactionManager

fun configureDatabases() {
    val database = Database.connect(
        url = "jdbc:mysql://db4free.net:3306/prog_web_mobile", // TODO: Url
        driver = "com.mysql.cj.jdbc.Driver",
        user = "prog_web_mobile",
        password = "adminadmin"
    )
    TransactionManager.defaultDatabase = database
}
