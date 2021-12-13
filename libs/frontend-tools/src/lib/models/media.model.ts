import { IMedia, MediaMetadata, FilesystemInfos } from "@zuokin-photos/models";

export class Media implements IMedia {
  constructor(
    public id: string,
    public productUrl: string,
    public baseUrl: string,
    public mimeType: string,
    public mediaMetadata: MediaMetadata,
    public fileSystemInfos: FilesystemInfos,
    public filename: string
  ) {
    this.id = id;
    this.productUrl = productUrl;
    this.baseUrl = baseUrl;
    this.mimeType = mimeType;
    this.mediaMetadata = mediaMetadata;
    this.fileSystemInfos = fileSystemInfos;
    this.filename = filename;
  }
}
