import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment, User, AuthService, UserService, UtilitiesService } from '@zuokin-photos/frontend-tools';


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
    private authService: AuthService,
    private userService: UserService,
    private utilitiesService: UtilitiesService
  ) {
    console.log(environment);
    // subscribe to current user observable
    this.currentUser$ = this.userService.currentUser$;
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
}
