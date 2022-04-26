import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'zphotos-settings',
  template: `
    <div class="page gallery">

      <div class="content padded">
        <div>Settings page</div>
      </div>

    </div>
  `,
  // styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  ngOnInit(): void {
    console.log('Settings Page');
  }
}
