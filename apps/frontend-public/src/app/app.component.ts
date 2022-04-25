import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { environment, User, AuthService, UserService, UtilitiesService, Media, MediaService, WINDOW } from '@zuokin-photos/frontend-tools';
import {
  fileOpen,
  directoryOpen,
  fileSave,
  supported,
  FileWithDirectoryHandle,
} from 'browser-fs-access';
import * as fs from 'fs';
import * as ExifReader from 'exifreader';


@Component({
  selector: 'zphotos-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'frontend-public';
  /**
   * Observable that gives current user
   */
  public currentUser$: Observable<User>;

  constructor(
    public router: Router,
    public navigation: NavigationService,
    private authService: AuthService,
    private userService: UserService,
    private utilitiesService: UtilitiesService,
    public mediaService: MediaService,
    @Inject(WINDOW) private window: Window & { __env: any }
  ) {
    console.log(environment);
    this.navigation.startSaveHistory();

    // subscribe to current user observable
    this.currentUser$ = this.userService.currentUser$;

    console.log('Home Page');
    this.getAllMedias();
  }

  ngOnInit(): void {
    // check if app is in maintenance mode
    this.utilitiesService.isAppInMaintenanceMode().subscribe((inMaintenance: boolean) => {
      if (!inMaintenance) {
        this.authService.checkForExistingToken();
      }
    }, error => {
      console.error(error);
    });
  }

  public logout(): void {
    this.authService.logout();
  }

  public goToSettings(): void {
    this.router.navigate(['settings']);
  }

  public goToGallery(): void {
    const historyLength = this.navigation.getHistory().length;
    const index = this.navigation.getHistory().lastIndexOf('/');
    if (index >= 0) {
      console.log('Go to history n ', 0 - (historyLength - index - 1));
      this.window.history.go(0 - (historyLength - index - 1));
    } else {
      console.log('this.router.navigate([\'\']);')
      this.router.navigate(['']);
    }
  }

  public goToAccount(): void {
    this.router.navigate(['account']);
  }

  public getAllMedias(): void {
    this.mediaService.getAllMediasTest().then((medias: Media[]) => {
      console.log(medias);
      medias.forEach((media: Media) => {
        console.log(media.mediaMetadata?.tags?.get('ExifReaderTags'));
      })
    });
  }
}

import { Injectable } from '@angular/core'
import { Location } from '@angular/common'
// import { Router, NavigationEnd } from '@angular/router'
import { NavigationEnd } from '@angular/router'

@Injectable()
export class NavigationService {
  private history: string[] = []

  constructor(private router: Router, private location: Location) { }

  public startSaveHistory():void{
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.history.push(event.urlAfterRedirects)
      }
    });
  }

  public getHistory(): string[] {
    return this.history;
  }

  public goBack(): void {
    if (this.history.length > 0) {
      console.log('goBack');
      this.location.back();
      this.history.pop();
    } else {
      console.log('navigateByUrl');
      this.router.navigateByUrl("/")
    }
  }

  public getPreviousUrl(): string {
    if (this.history.length > 0) {
      return this.history[this.history.length - 2];
    }

    return '';
  }
}
