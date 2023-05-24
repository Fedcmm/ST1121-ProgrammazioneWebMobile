package it.unicam.cs.pawm.model

import org.jetbrains.exposed.sql.Table

data class RefreshToken(
    val userId: Int,
    val token: String,
    val expiration: Long
)

object RefreshTokenTable : Table() {
    val userId = integer("userId")
    val token = varchar("token", 300)
    val expiration = long("expiration")

    override val primaryKey = PrimaryKey(userId)
}