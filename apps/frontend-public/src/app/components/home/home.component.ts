import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  fileOpen,
  directoryOpen,
  fileSave,
  supported,
  FileWithDirectoryHandle,
} from 'browser-fs-access';
import { Subscription } from 'rxjs';
import { MediaService } from '@zuokin-photos/frontend-tools';

@Component({
  selector: 'zphotos-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  loginLoadingSpinner = false;
  fileNames: string[] = [];
  files: File[] = [];
  filesInfos: {
    file: File,
    fileName: string,
    uploadProgress: number
  }[] = [];
  uploadProgress!: number;
  uploadSub!: Subscription;

  constructor(
    private http: HttpClient,
    public mediaService: MediaService,
    ) {}

  ngOnInit(): void {
    console.log('Home Page');
  }

  public showFiles(event: any): void {
    console.log(event);
    console.log((event as HTMLInputElement).files);
  }

  public onFileSelected(event: any) {
    const files: File[] = event.target.files;
    console.log(files);
    this.files = [...files].filter((file: File) => file.name.match(/\.(jpg|jpeg|png|gif|mp4)$/));

    if (files.length > 0) {
      [...files]
        .forEach((file: File, i: number) => {
          console.log(file);
          console.log(i);
          this.filesInfos.push({
            file: file,
            fileName: event.target.files[i].webkitRelativePath,
            uploadProgress: 0
          });
      });
    }

    this.filesInfos = this.filesInfos.filter((fileInfos: { file: File, fileName: string, uploadProgress: number }) =>
      fileInfos.fileName.match(/\.(jpg|jpeg|png|gif|mp4)$/));
    console.log(this.filesInfos);
  }

  public uploadSelectedFiles(): void {
    const formData = new FormData();

    formData.append('test', JSON.stringify({ bob: 'marley' }));
    if (this.filesInfos) {
      this.filesInfos.forEach((fileInfos: { file: File, fileName: string, uploadProgress: number }, index: number) => {
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

        this.mediaService.updloadMedias(formData).subscribe((event: HttpEvent<any>) => {
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
        }, (error: any) => {
          console.error(error);
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
        // startIn: 'pictures'
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
