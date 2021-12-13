export interface IMediaMetadata {
  creationTime: string;
  width: string;
  height: string;
  video?: {
    fps: number;
    status: string;
  };
  photo?: {
    cameraMake: string;
    cameraModel: string;
    focalLength: number;
    apertureFNumber: number;
    isoEquivalent: number;
    exposureTime: string;
  }
}
