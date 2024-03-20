import { Component, Injector } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './shared/components/navigation/navigation.component';
import { PopupService } from './core/services/popup.service';
import { createCustomElement } from '@angular/elements';
import { PopupComponent } from './shared/components/popup/popup.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(injector: Injector, public popup: PopupService) {
    const popupElement = createCustomElement(PopupComponent, { injector });

    customElements.define('popup-element', popupElement);
  }
}
