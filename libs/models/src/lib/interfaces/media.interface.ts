import { IFileSystemInfos } from './media-filesystem-infos.interface';
import { IMediaMetadata } from './media-metadata.interface';

export interface IMedia {
  productUrl: string;
  baseUrl: string;
  mimeType: string;
  mediaMetadata?: IMediaMetadata;
  fileSystemInfos: IFileSystemInfos;
  filename: string;
}
