import { IMedia } from '@zuokin-photos/models';
import { MediaMetadata, MediaFileSystemInfos } from '@zuokin-photos/frontend-tools';
import { environment } from '@zuokin-photos/frontend-tools';

export class Media implements IMedia {
  constructor(
    public productUrl: string,
    public baseUrl: string,
    public mimeType: string,
    public mediaMetadata: MediaMetadata,
    public fileSystemInfos: MediaFileSystemInfos,
    public filename: string,
    // tslint:disable-next-line: variable-name
    public _id?: string
  ) {
    // this.productUrl = `${environment.staticAssets}/${fileSystemInfos.webkitRelativePath}`;
    this.productUrl = productUrl;
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
    this.filename = filename;
    this._id = _id;
  }
}
