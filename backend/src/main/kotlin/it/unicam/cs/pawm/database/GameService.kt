package it.unicam.cs.pawm.database

import it.unicam.cs.pawm.model.Game
import it.unicam.cs.pawm.model.GameTable

class GameService : DatabaseService<Game, Int>(GameTable) {

    override suspend fun add(newRecord: Game): Int {
        TODO("Not yet implemented")
    }

    override suspend fun read(id: Int): Game? {
        TODO("Not yet implemented")
    }

    override suspend fun readAll(): List<Game> {
        TODO("Not yet implemented")
    }

    override suspend fun delete(id: Int) {
        TODO("Not yet implemented")
    }

    override suspend fun update(updRecord: Game) {
        TODO("Not yet implemented")
    }
}