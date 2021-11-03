import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotificationService, AuthService, ErrorHandlingService } from '@zuokin-photos/frontend-tools';


/** Inject API Token into the request (if possible and/or permitted) */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    protected notificationService: NotificationService,
    private authService: AuthService,
    protected errorHandlingService: ErrorHandlingService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if (
        request.url.indexOf('auth/api/login') > 0
        || request.url.indexOf('auth/api/signup') > 0
        || request.url.indexOf('management/api/is-in-maintenance') > 0
        || request.url.indexOf('opendata.paris.fr') > 0
      ) {
        return next.handle(request); // do nothing on the request
      }

      const jwtToken = this.authService.getToken();

      // if (jwtToken && this.authService.isTokenExpired(jwtToken)) {
      //   console.log('TokenInterceptor - got token, but expired');
      //   // @TODO : refresh token (front + back)
      //   this.authService.logout();

      //   // On affiche la modale de session expirée uniquement si l'application ne vient pas juste de s'ouvrir
      //   // if (this.userService.getCurrentUser() && !this.authService.timeoutDialogRef) {
      //   //   this.authService.openTimeoutDialog();
      //   // }
      // }

      request = request.clone({
        setHeaders: {
          'x-access-token': `${jwtToken}`
        }
      });

      return next.handle(request);
  }

}
