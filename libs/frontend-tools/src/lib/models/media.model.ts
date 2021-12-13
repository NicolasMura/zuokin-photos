import { IMedia, MediaMetadata, FilesystemInfos } from "@zuokin-photos/models";

export class Media implements IMedia {
  constructor(
    public productUrl: string,
    public baseUrl: string,
    public mimeType: string,
    public mediaMetadata: MediaMetadata,
    public fileSystemInfos: FilesystemInfos,
    public filename: string,
    // tslint:disable-next-line: variable-name
    public _id?: string
  ) {
    this.productUrl = productUrl;
    this.baseUrl = baseUrl;
    this.mimeType = mimeType;
    this.mediaMetadata = mediaMetadata;
    this.fileSystemInfos = fileSystemInfos;
    this.filename = filename;
    this._id = _id;
  }
}
