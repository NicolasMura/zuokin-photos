import { IMediaMetadata } from '@zuokin-photos/models';

export class MediaMetadata implements IMediaMetadata {
  constructor(
    public creationTime: string,
    public width: string,
    public height: string,
    public video?: {
      fps: number,
      status: string,
    },
    public photo?: {
      cameraMake: string,
      cameraModel: string,
      focalLength: number,
      apertureFNumber: number,
      isoEquivalent: number,
      exposureTime: string,
    }
  ) {
    this.creationTime = creationTime;
    this.width = width;
    this.height = height;
    this.video = video;
    this.photo = photo;
  }
}
