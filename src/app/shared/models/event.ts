import { User } from './user';

export class Event {
  id: number;
  title: string;
  content: string;
  start_date_time: string;
  end_date_time: string;
  created_at: string;
  user: User;

  constructor(event: any) {
    this.id = event.id || 0;
    this.title = event.title || '';
    this.content = event.content || '';
    this.start_date_time = event.start_date_time;
    this.end_date_time = event.end_date_time;
    this.created_at = event.created_at;
    this.user = event.user || new User({});
  }
}
