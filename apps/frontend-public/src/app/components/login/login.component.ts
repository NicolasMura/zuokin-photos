import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CoreConstants, AuthService, NotificationService } from '@zuokin-photos/frontend-tools';
import { LoginResponse } from '@zuokin-photos/models';


/**
 * Component that displays login form
 */
@Component({
  selector: 'zphotos-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  loginLoadingSpinner = false;
  loginError = false;
  hide = true;
  get usernameInput(): AbstractControl | null { return this.loginForm.get('username'); }
  get passwordInput(): AbstractControl | null { return this.loginForm.get('password'); }

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    // redirect user to calendar page if already logged
    if (this.authService.getToken()) {
      this.router.navigate([CoreConstants.routePath.root]);
    }
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  public login(): void {
    this.disableLoginForm();
    this.loginLoadingSpinner = true;
    this.loginError = false;

    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;

    if (username && password) {
      this.authService.login(username, password).subscribe({
        next: (loginResponse: LoginResponse) => {
          console.log(loginResponse);
          this.router.navigate([CoreConstants.routePath.root]);
        },
        error: (e) => {
          console.error(e);
          this.loginLoadingSpinner = false;
          this.loginError = true;
          this.enableLoginForm();
          const userErrorMsg = e.message ? e.message + ' (connexion impossible)'
            : 'Erreur inconnue (connexion impossible)';
          this.notificationService.sendNotification(
            userErrorMsg,
            '',
            { panelClass: ['failure', 'notification-login-by-username-error'] }
          );
        },
        complete: () => console.log('complete')
      });
    }
  }

  disableLoginForm(): void {
    this.loginForm.controls.username.disable();
    this.loginForm.controls.password.disable();
  }

  enableLoginForm(): void {
    this.loginForm.controls.username.enable();
    this.loginForm.controls.password.enable();
  }

  /*
   * Handle form errors
   */
  public errorHandling = (control: string, error: string) => {
    return this.loginForm.controls[control].hasError(error);
  }
}
