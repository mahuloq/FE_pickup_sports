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
  guests: any = [];

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
          console.log('get event', this.event);
          //prepare the guests

          this.prepareGuests();
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

        //prepare the guests
        if (this.currentUser) {
          if (this.hasJoined) {
            this.event.participants.push(this.currentUser);
          } else {
            this.event.participants = this.event.participants.filter(
              (p) => p.id !== this.currentUser?.id
            );
          }
          this.prepareGuests();
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  prepareGuests() {
    // refereance the guests via property
    this.guests = [...this.event.participants];

    const emptySlots = this.event.guests - this.event.participants.length;

    for (let i = 0; i < emptySlots; i++) {
      this.guests.push({ empty: true });
    }
  }

  trackById(index: number, item: any) {
    return item.id || index;
  }
}
