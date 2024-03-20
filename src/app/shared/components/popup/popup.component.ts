import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [],
  template: `<span class="notification">{{ message }}</span>`,
  animations: [
    trigger('state', [
      state(
        'void',
        style({
          transform: 'translateX(100%)',
          opacity: 0,
        })
      ),
      state(
        'opened',
        style({
          transform: 'translateX(0)',
          opacity: 1,
        })
      ),
      transition('void => opened', animate('300ms ease-out')),
      transition('opened => void', animate('300ms ease-in')),
    ]),
  ],
  styles: [
    `
      .notification {
        display: block;
        position: fixed;
        top: 20%;
        right: 0;
        z-index: 1000;
        width: 250px;
      }
    `,
  ],
})
export class PopupComponent {
  @HostBinding(`@state`)
  state: 'opened' | 'void' = 'void';

  @Input()
  set message(msg: string) {
    this._message = msg;
    this.state = 'opened';
  }

  get message(): string {
    return this._message;
  }

  private _message = '';

  @Output()
  closed = new EventEmitter<void>();
}
