import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Event } from '../../shared/models/event';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private http: HttpClient) {}

  getEvents(page: number) {
    return this.http.get<Event[]>(`${environment.apiURL}/events?page=${page}`);
  }

  getEvent(id: string | number) {
    return this.http.get<Event>(`${environment.apiURL}/events/${id}`);
  }

  createEvent(event: Event) {
    return this.http.post(`${environment.apiURL}/events`, event);
  }

  joinEvent(eventId: number) {
    return this.http.post(`${environment.apiURL}/events/${eventId}/join`, {});
  }

  leaveEvent(eventId: number) {
    return this.http.delete(`${environment.apiURL}/events/${eventId}/leave`);
  }
}
