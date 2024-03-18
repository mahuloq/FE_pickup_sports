import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import Pusher from 'pusher-js';

@Injectable({
  providedIn: 'root',
})
export class NotifcationService {
  pusher: any;
  channel: any;

  constructor() {}

  listen(userId: number) {
    (this.pusher = new Pusher(environment.pusher.key)),
      {
        cluster: environment.pusher.cluster,
      };

    this.channel = this.pusher.subscribe(userId.toString());

    this.channel.bind('notification');
  }
}
