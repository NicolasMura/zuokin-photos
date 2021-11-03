import { Injectable } from '@angular/core';
import { NotificationService } from './notification.service';


/**
 * Error Handling Service
 */
@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  constructor(
    private notificationService: NotificationService
  ) { }

  /**
   * Centralized error management - User notifications display
   */
  handleError(error: any): void {
    let userErrorMsg = '';
    let errorStatus = -1;

    userErrorMsg = error.message ? error.message : 'Erreur inconnue';
    errorStatus = error.status ? error.status : 0;

    switch (errorStatus) {
      // Here we could intercept API errors based on their status code, and show custom messages
      // case 500:
      //   // ...
      //   break;

      // case 401:
      //   // ...
      //   break;

      // ...

      default:
        this.notificationService.sendNotification(userErrorMsg);
        break;
    }
  }
}
