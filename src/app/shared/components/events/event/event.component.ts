import { Component, Input } from '@angular/core';
import { Event } from '../../../models/event';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss',
})
export class EventComponent {
  @Input({ required: true }) event: Event = new Event({});
}
