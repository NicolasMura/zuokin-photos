import { Schema, Prop, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IMediaFileSystemInfos } from '../interfaces/media-filesystem-infos.interface';

// export type UserDocument = User & Document; // ??

@Schema({
  versionKey: false,
  _id: false
})
export class MediaFileSystemInfos extends Document implements IMediaFileSystemInfos {
  @Prop(raw({
    kind: { type: String },
    name: { type: String }
  }))
  directoryHandle!: {
    kind: string;
    name: string;
  };

  @Prop()
  webkitRelativePath!: string;

  @Prop()
  lastModified!: number;

  @Prop()
  lastModifiedDate!: Date;

  @Prop()
  name!: string;

  @Prop()
  size!: number;

  @Prop()
  type!: string;
}

export const MediaFileSystemInfosSchema = SchemaFactory.createForClass(MediaFileSystemInfos);

// Ex.:
// {
//   "directoryHandle": {
//     "kind": "directory"
//     "name": "subfolder"
//   },
//   "webkitRelativePath": "2000_zuokin_test/subfolder/IMG_20210103_135639.jpg",
//   "lastModified": 1609678599000,
//   "lastModifiedDate": "2021-01-03T12:56:39.000Z",
//   "name": "IMG_20210103_135639.jpg",
//   "size": 2870268,
//   "type": "image/jpeg" // or "type": "video/mp4"
// }
