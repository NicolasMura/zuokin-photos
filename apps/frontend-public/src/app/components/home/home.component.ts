import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import {
  fileOpen,
  directoryOpen,
  fileSave,
  supported,
  FileWithDirectoryHandle,
} from 'browser-fs-access';
import { Subscription } from 'rxjs';
import { Media, MediaFileSystemInfos, MediaMetadata, MediaService } from '@zuokin-photos/frontend-tools';
import * as fs from 'fs';
import * as ExifReader from 'exifreader';

@Component({
  selector: 'zphotos-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loginLoadingSpinner = false;
  fileNames: string[] = [];
  files: File[] = [];
  filesInfos: {
    file: File,
    fileName: string,
    media: Media,
    testThumbnail: any,
    uploadProgress: number
  }[] = [];
  uploadProgress!: number;
  uploadSub!: Subscription;

  constructor(
    private http: HttpClient,
    public mediaService: MediaService,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    console.log('Home Page');
  }

  public getAllMedias(): void {
    this.mediaService.getAllMediasTest().then((medias: Media[]) => {
      console.log(medias);
      medias.forEach((media: Media) => {
        console.log(media.mediaMetadata?.tags?.get('ExifReaderTags'));
      })
    });
  }

  public showFiles(event: any): void {
    console.log(event);
    console.log((event as HTMLInputElement).files);
  }

  public onFileSelected(event: any): void {
    const files: File[] = event.target.files;
    console.log(files);
    this.files = [...files].filter((file: File) => file.name.match(/\.(jpg|jpeg|png|gif|mp4)$/));

    if (files.length > 0) {
      [...files]
        .forEach(async (file: File, i: number) => {
          console.log(file);
          console.log(i);
          let tags;

          if (file.type.indexOf('image') > -1) {
            tags = await ExifReader.load(file);
          }

          console.log(tags);

          const isPhoto = file.type.indexOf('image') > -1;
          const isVideo = file.type.indexOf('video') > -1;
          const newMedia: Media = new Media(
            '',
            '',
            file.type,
            new MediaMetadata(
              '',
              '',
              '',
              isPhoto ? { ExifReaderTags: tags } : undefined,
              isVideo ? {
                fps: 0,
                status: '',
              } : undefined,
              isPhoto ? {
                cameraMake: '',
                cameraModel: '',
                focalLength: 0,
                apertureFNumber: 0,
                isoEquivalent: 0,
                exposureTime: ''
              } : undefined
            ),
            // {
            //   creationTime: '',
            //   width: '',
            //   height: '',
            //   tags: isPhoto ? (new Map()).set('ExifReaderTags', tags) : undefined, // { ExifReaderTags: tags } : undefined,
            //   video: isVideo ? {
            //     fps: 0,
            //     status: '',
            //   } : undefined,
            //   photo: isPhoto ? {
            //     cameraMake: '',
            //     cameraModel: '',
            //     focalLength: 0,
            //     apertureFNumber: 0,
            //     isoEquivalent: 0,
            //     exposureTime: ''
            //   } : undefined
            // },
            new MediaFileSystemInfos(
              {
                // kind: blob.directoryHandle?.kind,
                kind: '',
                // name: blob.directoryHandle?.name
                name: ''
              },
              (file as any).webkitRelativePath,
              file.lastModified,
              new Date(file.lastModified),
              file.name,
              file.size,
              file.type
            ),
            file.name
          );
          console.log(newMedia);

          if (isVideo) console.log(window.URL.createObjectURL(file));
          this.filesInfos.push({
            file: file,
            fileName: event.target.files[i].webkitRelativePath,
            media: newMedia,
            // testThumbnail: newMedia?.mediaMetadata?.photo ? this.domSanitizer.bypassSecurityTrustUrl('data:image/png;base64, ' + tags?.Thumbnail?.base64) : '',
            testThumbnail: isPhoto ? this.domSanitizer.bypassSecurityTrustUrl('data:image/png;base64, ' + newMedia.mediaMetadata?.tags?.get('ExifReaderTags')?.Thumbnail?.base64) : this.domSanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file)),
            uploadProgress: 0
          });
      });
    }

    // keep only media (remove other files and system files like .DS_Store, etc.)
    this.filesInfos = this.filesInfos.filter((fileInfos: { file: File, fileName: string, uploadProgress: number }) =>
      fileInfos.fileName.match(/\.(jpg|jpeg|png|gif|mp4)$/));
    console.log(this.filesInfos);
  }

  public uploadSelectedFiles(): void {
    const formData = new FormData();

    formData.append('test', JSON.stringify({ bob: 'marley' }));
    if (this.filesInfos) {
      this.filesInfos.forEach((fileInfos: { file: File, fileName: string, media: Media, uploadProgress: number }, index: number) => {
        console.log(fileInfos);
        fileInfos.uploadProgress = 0;
        formData.append('files[]', fileInfos.file);
        // formData.append('files', file, file.name);
        // console.log(formData);

        // const upload$ = this.http.post("http://localhost:3333/api/medias/upload-multiple", formData, {
        //   reportProgress: true,
        //   observe: 'events'
        // })
        // .pipe(
        //   timeout(5000),
        //   finalize(() => this.reset())
        // );

        // this.uploadSub = upload$.subscribe(event => {
        //   if (event?.type == HttpEventType.UploadProgress) {
        //     this.uploadProgress = event.total ? Math.round(100 * (event.loaded / event?.total)) : 0;
        //   }
        // })

        // const upload$ = this.http
        //   .post('http://localhost:3333/api/medias/upload-multiple', formData, {
        //     // reportProgress: true,
        //     // observe: 'events'
        //   })
        //   .pipe(
        //     // timeout(5000),
        //     finalize(() => this.reset())
        //   );

        // this.uploadSub = upload$.subscribe((event) => {
        //   // if (event?.type == HttpEventType.UploadProgress) {
        //   //   this.uploadProgress = event.total ? Math.round(100 * (event.loaded / event?.total)) : 0;
        //   // }
        // });

        this.mediaService.updloadMedias(formData).subscribe({
          next: (event: HttpEvent<any>) => {
            // console.log(event);
            // console.log(event.type);
            if (event?.type == HttpEventType.UploadProgress) {
              // console.log('HttpEventType');
              // const index = this.filesInfos.findIndex((fileInfos: { file: File, fileName: string, uploadProgress: number }) =>
              //   fileInfos.fileName === file.webkitRelativePath);
              this.filesInfos[index].uploadProgress = event?.total && event?.total !== 0
                ? Math.round(100 * (event.loaded / event.total))
                : 0;
            }
          },
          error: (e) => console.error(e),
          complete: () => console.log('complete')
        });

        this.mediaService.createMedia(fileInfos.media).then((response) => {
          console.log(response);
        });

      });
    }
  }

  cancelUpload() {
    this.uploadSub.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = null as any;
    this.uploadSub = null as any;
  }

  async openDirectory(): Promise<void> {
    this.loginLoadingSpinner = true;

    // Open all files in a directory,
    // recursively including subdirectories.
    let blobsInDirectory!: FileWithDirectoryHandle[];
    try {
      blobsInDirectory = await directoryOpen({
        recursive: true,
        // startIn: 'pictures',
        // legacySetup: (rejectionHandler) => {
        //   const timeoutId = setTimeout(rejectionHandler, 10_000);
        //   return (reject) => {
        //     clearTimeout(timeoutId);
        //     if (reject) {
        //       reject('My error message here.');
        //     }
        //   }
        // }
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
  }
}
