import { IMedia } from '@zuokin-photos/models';
import { SafeUrl } from '@angular/platform-browser';
import { MediaMetadata, MediaFileSystemInfos } from '@zuokin-photos/frontend-tools';
import { environment } from '@zuokin-photos/frontend-tools';

export class Media implements IMedia {
  constructor(
    public productUrl: string,
    public baseUrl: string,
    public mimeType: string,
    public mediaMetadata: MediaMetadata,
    public fileSystemInfos: MediaFileSystemInfos,
    public fileName: string,
    public thumbnail: SafeUrl,
    // tslint:disable-next-line: variable-name
    public _id?: string
  ) {
    this.productUrl = `${environment.staticAssets}/${fileSystemInfos.webkitRelativePath}`;
    this.baseUrl = baseUrl;
    this.mimeType = mimeType;
    this.mediaMetadata = mediaMetadata;
    // this.mediaMetadata = new MediaMetadata(
    //   mediaMetadata.creationTime,
    //   mediaMetadata.width,
    //   mediaMetadata.height,
    //   mediaMetadata.tags,
    //   mediaMetadata.video,
    //   mediaMetadata.photo
    // );
    this.fileSystemInfos = fileSystemInfos;
    this.fileName = fileName;
    this.thumbnail = thumbnail;
    this._id = _id;
  }
}
