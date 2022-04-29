import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment, IBuildInfos, User, AuthService, UserService, NotificationService, UtilitiesService, Media, MediaService, WINDOW } from '@zuokin-photos/frontend-tools';
import {
  fileOpen,
  directoryOpen,
  fileSave,
  supported,
  FileWithDirectoryHandle,
} from 'browser-fs-access';
import * as moment from 'moment';
import { buildInfos } from '../build';


@Component({
  selector: 'zphotos-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'frontend-public';
  /**
   * build infos: hash, timestamp, user and jenkins Build Id
   * Allow use of buildInfo variable inside template, for display build infos
   */
  buildInfos: IBuildInfos;
  /**
   * Observable that gives current user
   */
  public currentUser$: Observable<User>;
  public isRefreshing = true;
  /**
   * Error management
   */
  public errors: {
    somethingIsBroken: {
      statusCode: string,
      statusMessage: string
    }
  } = {
    somethingIsBroken: {
      statusCode: '',
      statusMessage: ''
    }
  };

  constructor(
    public router: Router,
    private swUpdate: SwUpdate,
    private snackBar: MatSnackBar,
    public navigation: NavigationService,
    private authService: AuthService,
    private userService: UserService,
    private notificationService: NotificationService,
    private utilitiesService: UtilitiesService,
    public mediaService: MediaService,
    @Inject(WINDOW) private window: Window & { __env: any }
  ) {
    console.log(environment);
    this.buildInfos = buildInfos;
    console.log(
      `\n%cBuild Info:\n\n` +
        `%c ❯ Build env.: %c${
          environment.production ? 'production 🏭' : 'development 🚧'
        }\n` +
        `%c ❯ Build Version: ${buildInfos.jenkinsBuildNumber}\n` +
        ` ❯ Hash: ${buildInfos.hash}\n` +
        // ` ❯ User: ${buildInfos.user}\n` +
        ` ❯ Build Timestamp: ${buildInfos.timestamp}\n`,
      'font-size: 12px; color: #7c7c7b;',
      'font-size: 12px; color: #7c7c7b',
      environment.production
        ? 'font-size: 12px; color: #95c230;'
        : 'font-size: 12px; color: #e26565;',
      'font-size: 12px; color: #7c7c7b'
    );

    this.navigation.startSaveHistory();

    // subscribe to current user observable & get medias when user is logged
    this.currentUser$ = this.userService.currentUser$;
    this.currentUser$.subscribe((user: User) => {
      if (user) {
        this.getAllMedias();
      }
    });
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

    // try to lock screen orientation to portrait mode (not supported in Safari & iOS)
    this.tryToLockScreenOrientation();

    // connect to WebSocket Server
    // this.webSocketService.connect();

    // Service Workers
    this.checkForServiceWorkersUpdate();

    /* iOS specific */
    // See https://itnext.io/part-1-building-a-progressive-web-application-pwa-with-angular-material-and-aws-amplify-5c741c957259
    // Checks if should display install popup notification:
    if (this.utilitiesService.isIos() && !this.utilitiesService.isInStandaloneModeiOS()) {
      this.snackBar.openFromComponent(IosInstallComponent, {
        duration: 0,
        horizontalPosition: 'start',
        panelClass: ['mat-elevation-z3']
      });
    }
    /* iOS specific */
  }

  public tryToLockScreenOrientation(): void {
    console.log('try to lock screen orientation to portrait mode');
    const screenOrientation = window.screen.orientation;
    console.log(screenOrientation);
    if (screenOrientation) {
      screenOrientation.lock('portrait')
        .then(res => {
          console.log(res);
        })
        .catch(error => console.log(error));
    } else {
      console.log('window.screen.orientation not available... snif...');
      document.addEventListener('orientationchange', (bob) => {
        console.log(bob);
      });
    }
  }

  public checkForServiceWorkersUpdate(): void {
    this.swUpdate.available.subscribe(event => {
      console.log('current version is', event.current);
      console.log('available version is', event.available);

      this.notificationService.sendNotification('Nouvelle version disponible ! Mettre à jour ?', 'OK')
        .onAction().subscribe(() => {
          window.location.reload();
        });
    });

    this.swUpdate.activated.subscribe(event => {
      console.log('old version was', event.previous);
      console.log('new version is', event.current);
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
      this.router.navigate(['/']);
    }
  }

  public goToAccount(): void {
    this.router.navigate(['account']);
  }

  public getAllMedias(): void {
    this.mediaService.getAllMediasTest()
      .then((medias: Media[]) => {
        console.log(medias);
        medias.forEach((media: Media) => {
          // console.log(media.fileName);
          // console.log(media.mediaMetadata?.tags?.get('ExifReaderTags'));
          // console.log(moment.unix(moment(media.mediaMetadata?.tags?.get('creationJsDateTime')).unix()).format());
        })
      })
      .finally(() => this.isRefreshing = false)
      .catch(error => {
        console.error(error);
        this.errors.somethingIsBroken.statusCode = error.status && error.status !== 0 ? error.status.toString() : '0';
        this.errors.somethingIsBroken.statusMessage = error.message ? error.message : 'Unknown error';
      });
  }

  deleteAll(): void {
    this.mediaService.deleteAllMedias()
      .then((response: any) => {
        console.log(response);
        this.ngOnInit();
      })
      .catch(error => {
        console.error(error);
        this.errors.somethingIsBroken.statusCode = error.status && error.status !== 0 ? error.status.toString() : '0';
        this.errors.somethingIsBroken.statusMessage = error.message ? error.message : 'Unknown error';
      });
  }

  refresh(): void {
    window.location.reload();
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

import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  // selector: 'app-ios-install',
  template: `
    <style>
      :host {
        opacity: 0.8;
      }
      .content {
        margin: 0.5em;
        text-align: center;
      }
      .full-width {
        margin-top: 1em;
        width: 100%;
        text-align: center;
      }
      .link-close {
        color: red;
        font-variant-caps: all-petite-caps;
        font-weight: bold;
      }
      .btn-close {
        position: absolute;
        top: 1em;
        right: 1em;
      }
    </style>
    <div class="content">
      Install this app on your device.
      <br/>Tap the share icon and then <br/><strong>Add to homescreen</strong>.
      <div class="full-width"><mat-icon>arrow_downward</mat-icon></div>
    </div>
    <button class="btn-close" mat-icon-button (click)="close()" aria-label="Close">
      <mat-icon>close</mat-icon>
    </button>
  `
})
export class IosInstallComponent {
  constructor(
    private snackBarRef: MatSnackBarRef<IosInstallComponent>
  ) {}

  close(): void {
    this.snackBarRef.dismiss();
  }
}
