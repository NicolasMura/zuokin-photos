import { IFilesystemInfos } from './media-filesystem-infos.interface';
import { IMediaMetadata } from './media-metadata.interface';

export interface IMedia {
  id: string;
  productUrl: string;
  baseUrl: string;
  mimeType: string;
  mediaMetadata?: IMediaMetadata;
  fileSystemInfos: IFilesystemInfos;
  filename: string;
}
