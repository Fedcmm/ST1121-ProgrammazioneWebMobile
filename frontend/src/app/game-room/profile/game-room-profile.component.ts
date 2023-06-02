import { Component } from '@angular/core';
@Component({
  selector: 'app-game-room-profile',
  template: `
    <div>
      <ul>
        <li (click)="selectedSection = 'info'">Informazioni</li>
        <li (click)="selectedSection = 'events'">Eventi</li>
        <li (click)="selectedSection = 'records'">Record verificati</li>
        <li (click)="selectedSection = 'games'">Giochi</li>
      </ul>
      <div *ngIf="selectedSection === 'info'">
        <app-game-room-info/>
      </div>
      <div *ngIf="selectedSection === 'events'">
        <app-game-room-events/>
      </div>
      <div *ngIf="selectedSection === 'records'">
        <app-game-room-records/>
      </div>
      <div *ngIf="selectedSection === 'games'">
        <app-game-room-games/>
      </div>
    </div>
  `,
})
export class GameRoomProfileComponent {
  selectedSection: string = 'info';
}