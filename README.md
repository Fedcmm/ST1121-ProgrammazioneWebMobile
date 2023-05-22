# ST1121-ProgrammazioneWebMobile
[ST1121](http://didattica.cs.unicam.it/doku.php?id=didattica:ay2223:pawm:main) Programmazione Applicazione Web e Mobile
_Professore Diego Bonura_ [link](https://computerscience.unicam.it/diego-bonura)<br>

[Computer Science](https://computerscience.unicam.it/) - University of Camerino [Unicam](https://www.unicam.it/).

### Group project DekketScris - DKS
* Federico Maria Cruciani, as, [@Fedcmm](https://github.com/Fedcmm)
* Simone Cisca, as, [@SpaceCowboySCX](https://github.com/SpaceCowboySCX)


## Descrizione Progetto
Repository originale: [ST1121-ProgrammazioneWebMobile](https://github.com/Fedcmm/ST1121-ProgrammazioneWebMobile).

*HighScoreHQ* è un'applicazione web Single-Page Application (SPA) che permette di gestire un database di punteggi di videogiochi.
L'applicazione è stata sviluppata utilizzando il framework [Angular](https://angular.io/) per il frontend e [Kotlin](https://kotlinlang.org/) per il backend.
Il database utilizzato è [MariaDB](https://mariadb.org/).
L'applicazione è stata sviluppata per il corso di Programmazione Applicazioni Web e Mobile (PAWM) dell'Università di Camerino.


### Funzionalità
* #### Admin
L'utente *Admin* è un' entità che rappresenta un amministratore del sito.
* #### Player
L'utente *Player* deve essere autenticato, quindi necessita di un account, una volta
  registrato e autenticato potrà: inserire, modificare ed eliminare i punteggi di un gioco Arcade.
  Inoltre potrà seguire dei topic di gioco, in modo da ricevere notifiche quando vengono pubblicati nuovi punteggi.
* #### GameRoom
L'utente *GameRoom* è un' entità che rappresenta una sala giochi.
Potrà convalidare i punteggi inseriti dagli utenti *Player* e pubblicare eventi o news.
* #### Game
L'utente *Game* è un' entità che rappresenta un gioco Arcade, verrà gestita nel database
  dall'utente *Admin*, potrà essere seguita dagli utenti *Player* e le *GameRoom* potranno includerla nel loro catalogo di giochi.


## Tecnologie Utilizzate
* [kotlin](https://kotlinlang.org/)
* [angular](https://angular.io/)
* [mariadb](https://mariadb.org/)


## Struttura Repository
* [backend](backend) contiene il codice sorgente del backend.
* [frontend](frontend) contiene il codice sorgente del frontend.


## Licenza
[MIT](LICENSE) © 2021 Federico Maria Cruciani, Simone Cisca 