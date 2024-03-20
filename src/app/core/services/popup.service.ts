import { Injectable } from '@angular/core';
import { PopupComponent } from '../../shared/components/popup/popup.component';
import { NgElement, WithProperties } from '@angular/elements';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  constructor() {}

  showAsElement(message: string) {
    const popupElement: NgElement & WithProperties<PopupComponent> =
      document.createElement('popup-element') as any;

    //setTimeout to remove element
    setTimeout(() => {
      document.body.removeChild(popupElement);
    }, 3000);

    popupElement.message = message;
    document.body.appendChild(popupElement);
  }
}
