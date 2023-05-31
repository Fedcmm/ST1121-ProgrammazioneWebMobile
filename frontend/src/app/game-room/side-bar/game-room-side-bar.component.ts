import { Component } from '@angular/core';

@Component({
  selector: 'app-game-room-side-bar',
  templateUrl: './game-room-side-bar.component.html',
  styleUrls: ['./game-room-side-bar.component.css']
})
export class GameRoomSideBarComponent {
  menuItems = [
    { label: 'Informazioni', section: 'info' },
    { label: 'Eventi', section: 'events' },
    { label: 'Record verificati', section: 'records' },
    { label: 'Giochi', section: 'games' }
  ];

  selectMenuItem(item: any) {
    // Emetti un evento o esegui un'azione quando viene selezionata una voce di menu
  }
}
