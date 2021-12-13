import * as bcrypt from 'bcrypt';
import { Schema, Prop, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Logger } from '@nestjs/common';
import { IFilesystemInfos } from '../interfaces/media-filesystem-infos.interface';

// export type UserDocument = User & Document; // ??

@Schema({
  versionKey: false,
  _id: false
})
export class FilesystemInfos extends Document implements IFilesystemInfos {
  @Prop(raw({
    webkitRelativePath: { type: String },
    lastModified: { type: Number }
  }))
  directoryHandle!: {
    webkitRelativePath: string;
    lastModified: number;
  };

  @Prop()
  lastModifiedDate!: Date;

  @Prop()
  name!: string;

  @Prop()
  size!: number;

  @Prop()
  type!: string;
}

export const FilesystemInfosSchema = SchemaFactory.createForClass(FilesystemInfos);

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
