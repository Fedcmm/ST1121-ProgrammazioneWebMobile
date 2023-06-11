export class Event {
    id: number;
    name: string;
    description: string;
    gameRoom: number;
    startDate: Date;
    endDate: Date;

    constructor(id: number, name: string, description: string, gameRoom: number, startDate: Date, endDate: Date) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.gameRoom = gameRoom;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
