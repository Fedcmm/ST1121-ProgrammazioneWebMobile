import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {EventService} from "../../../../service/event-service.service";
import {Event} from "../../../../model/Event";

@Component({
  selector: 'app-game-room-events',
  template: `
    <div>
      <div *ngFor="let event of events">
        <!-- Mostra il contenuto dell'evento qui -->
      </div>
      <div #scrollTrigger></div>
    </div>
  `,
})
export class GameRoomEventsComponent implements OnInit, AfterViewInit {
  @ViewChild('scrollTrigger') scrollTrigger!: ElementRef;

  events: Event[] = [];
  currentPage = 1;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.loadEvents();
  }

  ngAfterViewInit() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };
    const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            this.loadEvents();
          }
        },
        options
    );
    observer.observe(this.scrollTrigger.nativeElement);
  }

  loadEvents() {
    this.eventService.getEvents(this.currentPage).subscribe((newEvents) => {
      this.events.push(...newEvents);
      this.currentPage++;
    });
  }
}