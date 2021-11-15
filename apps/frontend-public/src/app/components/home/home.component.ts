import { Component, OnInit } from '@angular/core';
import {
  fileOpen,
  directoryOpen,
  fileSave,
  supported,
} from 'browser-fs-access';


@Component({
  selector: 'zphotos-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loginLoadingSpinner = false;

  ngOnInit(): void {
    console.log('');
    // this.test();
  }

  async test(): Promise<void> {
    this.loginLoadingSpinner = true;

    // Open all files in a directory,
    // recursively including subdirectories.
    const blobsInDirectory = await directoryOpen({
      recursive: true,
      startIn: 'pictures'
    });
    this.loginLoadingSpinner = false;
    console.log(blobsInDirectory);
  }
}
