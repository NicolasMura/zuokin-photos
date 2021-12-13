import { Schema, Prop, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Logger } from '@nestjs/common';
import { IMediaMetadata } from '../interfaces/media-metadata.interface';

// export type UserDocument = User & Document; // ??

@Schema({
  versionKey: false,
  _id: false
})
export class MediaMetadata extends Document implements IMediaMetadata {
  @Prop()
  creationTime!: string;

  @Prop()
  width!: string;

  @Prop()
  height!: string;

  @Prop(raw({
    fps: { type: Number },
    status: { type: String }
  }))
  video?: {
    fps: number;
    status: string;
  };

  @Prop(raw({
    cameraMake: { type: String },
    cameraModel: { type: String },
    focalLength: { type: Number },
    apertureFNumber: { type: Number },
    isoEquivalent: { type: Number },
    exposureTime: { type: String }
  }))
  photo?: {
    cameraMake: string;
    cameraModel: string;
    focalLength: number;
    apertureFNumber: number;
    isoEquivalent: number;
    exposureTime: string
  }
}

export const MediaMetadataSchema = SchemaFactory.createForClass(MediaMetadata);

// Ex.:
// {
//   "creationTime": "2021-10-30T17:54:46Z",
//   "width": "1080",
//   "height": "1920",
//   "video": {
//     "fps": 29.67860765959896,
//     "status": "READY"
//   }
// }

// {
//   "creationTime": "2021-10-30T17:53:54Z",
//   "width": "3968",
//   "height": "2976",
//   "photo": {
//     "cameraMake": "HUAWEI",
//     "cameraModel": "VTR-L09",
//     "focalLength": 3.95,
//     "apertureFNumber": 2.2,
//     "isoEquivalent": 640,
//     "exposureTime": "0.058331001s"
//   }
// }
