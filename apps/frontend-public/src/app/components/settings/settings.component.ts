import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'zphotos-settings',
  template: `
    <div>Settings page</div>
  `,
  // styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  ngOnInit(): void {
    console.log('Settings Page');
  }
}
