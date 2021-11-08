import { Component } from '@angular/core';
import { environment } from '@zuokin-photos/frontend-tools';


@Component({
  selector: 'zphotos-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'frontend-public';

  constructor() {
    console.log(environment);
  }
}
