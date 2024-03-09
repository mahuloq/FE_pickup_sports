export class Sport {
  id: number;
  name: string;

  constructor(event: any) {
    this.id = event.id || 0;
    this.name = event.name;
  }
}
