import { Component, OnInit } from '@angular/core';
import {
  fileOpen,
  directoryOpen,
  fileSave,
  supported,
  FileWithDirectoryHandle
} from 'browser-fs-access';


@Component({
  selector: 'zphotos-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loginLoadingSpinner = false;

  ngOnInit(): void {
    console.log('Home Page');
  }

  async openDirectory(): Promise<void> {
    this.loginLoadingSpinner = true;

    // Open all files in a directory,
    // recursively including subdirectories.
    let blobsInDirectory!: FileWithDirectoryHandle[];
    try {
      blobsInDirectory = await directoryOpen({
        recursive: true,
        startIn: 'pictures'
      });
      this.loginLoadingSpinner = false;
      console.log(blobsInDirectory);
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        return console.error(err);
      }
      console.log('The user aborted a request.');
      this.loginLoadingSpinner = false;
      console.log(blobsInDirectory);
    }

    if (blobsInDirectory?.length > 0) {
      // console.log(blobsInDirectory[0].arrayBuffer());
      // console.log(blobsInDirectory[0].text());
      console.log(blobsInDirectory[0].directoryHandle);
    }
  }
}
