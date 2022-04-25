import { IMediaMetadata } from '@zuokin-photos/models';

export class MediaMetadata implements IMediaMetadata {
  // public creationTime: string;
  // public width: string;
  // public height: string;
  public tags?: Map<string, any>;
  // public video?: {
  //   fps: number,
  //   status: string,
  // };
  // public photo?: {
  //   cameraMake: string,
  //   cameraModel: string,
  //   focalLength: number,
  //   apertureFNumber: number,
  //   isoEquivalent: number,
  //   exposureTime: string,
  // };

  constructor(
    public creationTime: string,
    public width: string,
    public height: string,
    tags?: any,
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
    if (tags && (typeof tags === 'object')) {
      this.tags = new Map(Object.entries(tags));
    }
    if (video && Object.keys(video).length > 0) {
      this.video = video;
    }
    if (photo && Object.keys(photo).length > 0) {
      this.photo = photo;
    }
  }
}
