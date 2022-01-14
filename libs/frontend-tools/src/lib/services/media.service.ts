import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { catchError, delay, map, timeout, finalize } from 'rxjs/operators';
import { environment, NotificationService, ErrorHandlingService, Media } from '@zuokin-photos/frontend-tools';
import { GlobalService } from './global-service.service'; // strangely weird, but need to be imported like this...


/**
 * Medias Service
 */
@Injectable({
  providedIn: 'root'
})
export class MediaService extends GlobalService {
  protected baseUrlMedia = environment.backendApi.baseUrlMedia;
  uploadProgress!: number;
  uploadSub!: Subscription;

  /**
   * Variables representing a part of application state, in a Redux inspired way
   */
  private mediaStore: {
    medias: Media[]
  } = {
    medias: []
  };

  constructor(
    private http: HttpClient,
    protected notificationService: NotificationService,
    protected errorHandlingService: ErrorHandlingService
  ) {
    super(errorHandlingService);
  }

  /**
   * Get all medias
   */
  public getMedias(): Media[] {
    return this.mediaStore.medias;
  }

  /**
   * Get all medias from backend
   */
  public getAllMedias(): Observable<Media[]> {
    const url = `${this.baseUrlMedia}`;
    return this.http.get<Media[]>(url)
      .pipe(
        delay(1000),
        // map((users: User[]) => {
        //   const usersWellFormatted = users.map((user: User) => new User(
        //     user.username || '',
        //     user.email,
        //     user.mobile || '',
        //     user.isAdmin,
        //     user.created_at,
        //     user.profile,
        //     user._id
        //   ));

        //   this.users = usersWellFormatted;
        //   this.userStore.users = usersWellFormatted;

        //   return usersWellFormatted;
        // }),
        catchError(error => this.handleError(error))
      );
  }

  /**
   * Upload muliple medias to backend
   */
  // updloadMedias(formData: FormData): Observable<any[]> {
  updloadMedias(formData: FormData): Observable<any> {
    // const url = `${this.baseUrlMedia}/upload`;
    const url = `${this.baseUrlMedia}/upload-multiple`;
    return this.http.post<HttpEvent<any>>(
      url,
      formData,
      {
        reportProgress: true,
        observe: 'events',
      }
    )
    .pipe(
      // delay(1000),
      // timeout(5000),
      finalize(() => this.reset()),
      catchError(error => this.handleError(error))
    );
  }

  reset() {
    this.uploadProgress = null as any;
    this.uploadSub = null as any;
  }
}
