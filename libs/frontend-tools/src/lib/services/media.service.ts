import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { firstValueFrom, Observable, Subscription } from 'rxjs';
import { catchError, delay, map, timeout, finalize } from 'rxjs/operators';
import { environment, NotificationService, ErrorHandlingService, Media, MediaMetadata } from '@zuokin-photos/frontend-tools';
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
   * Variable representing a part of application state, in a Redux inspired way
   */
  private mediaStore: {
    medias: Media[] | null
  } = {
    medias: null
  };

  constructor(
    private http: HttpClient,
    private domSanitizer: DomSanitizer,
    protected notificationService: NotificationService,
    protected errorHandlingService: ErrorHandlingService
  ) {
    super(errorHandlingService);
  }

  /**
   * Get all medias
   */
  public getMedias(): Media[] | null {
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
        map((medias: Media[]) => {
          const mediasWellFormatted = medias.map((media: Media) => new Media(
            media.productUrl,
            media.baseUrl,
            media.mimeType,
            media.mediaMetadata,
            media.fileSystemInfos,
            media.fileName,
            media.thumbnail,
            media._id
          ));

          this.mediaStore.medias = mediasWellFormatted;

          return mediasWellFormatted;
        }),
        catchError(error => this.handleError(error))
      );
  }

  /**
   * Get all medias from backend
   */
  public async getAllMediasTest(): Promise<Media[]> {
    const url = `${this.baseUrlMedia}`;
    const source$ = this.http.get<Media[]>(url)
      .pipe(
        delay(1000),
        timeout(10000),
        map((medias: Media[]) => {
          const mediasWellFormatted = medias.map((media: Media) => {
            const mediaMetadata = new MediaMetadata(
              media.mediaMetadata.creationTime,
              media.mediaMetadata.width,
              media.mediaMetadata.height,
              media.mediaMetadata.tags,
              media.mediaMetadata.video,
              media.mediaMetadata.photo
            );

            const thumbnail = (media.mediaMetadata?.tags as any)?.ExifReaderTags?.Thumbnail?.base64;

            return new Media(
              // media.productUrl,
              thumbnail ? this.domSanitizer.bypassSecurityTrustUrl('data:image/png;base64, ' + thumbnail) as any : media.productUrl,
              media.baseUrl,
              media.mimeType,
              mediaMetadata,
              media.fileSystemInfos,
              media.fileName,
              media.thumbnail,
              media._id
            )
          });

          this.mediaStore.medias = mediasWellFormatted;
          // console.log(mediasWellFormatted);

          return mediasWellFormatted;
        }),
        catchError(error => this.handleError(error))
      );

    return await firstValueFrom(source$);
  }

  /**
   * Delete all medias from backend
   */
   public async deleteAllMedias(): Promise<any> {
    const url = `${this.baseUrlMedia}`;
    const source$ = this.http.delete<any>(url)
      .pipe(
        delay(1000),
        timeout(10000),
        catchError(error => this.handleError(error))
      );

    return await firstValueFrom(source$);
  }

  /**
   * Upload muliple medias to backend
   */
  // updloadMedias(formData: FormData): Observable<any[]> {
  public updloadMedias(formData: FormData): Observable<any> {
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

  /**
   * Create medias
   */
  public async createMedia(media: Media): Promise<any> {
    console.log(media);
    const mediaForUpload = {...media} as any;
    console.log(mediaForUpload);
    if (media.mediaMetadata.photo) {
      mediaForUpload.mediaMetadata.tags = Object.fromEntries(mediaForUpload.mediaMetadata?.tags);
    }
    console.log(mediaForUpload);

    const url = `${this.baseUrlMedia}`;
    const source$ = this.http.post<HttpEvent<any>>(
      url,
      mediaForUpload
    )
    .pipe(
      // delay(1000),
      // timeout(5000),
      finalize(() => this.reset()),
      catchError(error => this.handleError(error))
    );

    return await firstValueFrom(source$);
  }

  reset() {
    this.uploadProgress = null as any;
    this.uploadSub = null as any;
  }
}
