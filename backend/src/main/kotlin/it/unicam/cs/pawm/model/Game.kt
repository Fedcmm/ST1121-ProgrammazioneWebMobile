package it.unicam.cs.pawm.model

import org.jetbrains.exposed.sql.Table

data class Game(
        val id: Int,
        val name: String,
        val description: String,
        //Credo si implementi così la relazione uno a molti
        val gamesTypes: List<GameType>
)
object GameTable : Table(){
    val id = integer("id").autoIncrement()
    val name = varchar("name", 50)
    val description = varchar("description", 50)
    //Credo si implementi così la relazione uno a molti
    val gamesTypes = reference("gameType", GameTypeTable.gameType)

    override val primaryKey = PrimaryKey(id)
}