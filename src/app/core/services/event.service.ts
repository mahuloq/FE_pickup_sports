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
}
