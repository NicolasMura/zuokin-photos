import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'zphotos-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  ngOnInit(): void {
    console.log('Account Page');
  }
}
