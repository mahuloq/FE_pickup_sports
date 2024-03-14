import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../core/services/event.service';
import { Event } from '../../shared/models/event';
import { DatePipe } from '@angular/common';
import { UserService } from '../../core/services/user.service';
import { User } from '../../shared/models/user';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.scss',
})
export class EventDetailsComponent implements OnInit {
  event: Event = new Event({});
  currentUser: User | null = new User({});
  hasJoined: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.eventService.getEvent(params['id']).subscribe({
        next: (event: Event) => {
          this.event = event;
          this.hasJoined = event.has_joined;
          console.log(this.event);
        },
        error: (error) => console.log(error),
      });
    });

    this.userService.currentUserbehaviorSubject.subscribe(() => {
      this.currentUser = this.userService.currentUserbehaviorSubject.value;
    });
  }

  toggleJoinEvent() {
    //setup obs of join or leave
    const eventJoin$ = this.hasJoined
      ? this.eventService.leaveEvent(this.event.id)
      : this.eventService.joinEvent(this.event.id);

    eventJoin$.subscribe({
      next: () => {
        this.hasJoined = !this.hasJoined;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
