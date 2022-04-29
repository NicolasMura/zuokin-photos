import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IMedia } from '../interfaces/media.interface';
import { MediaMetadata } from './media-metadata.model';
import { MediaFileSystemInfos } from './media-filesystem-infos.model';

@Schema({
  collection: 'medias',
  versionKey: false
})
export class Media extends Document implements IMedia {
  @Prop()
  id!: string;

  @Prop()
  productUrl!: string;

  @Prop()
  baseUrl!: string;

  @Prop()
  mimeType!: string;

  @Prop()
  mediaMetadata?: MediaMetadata;

  @Prop()
  fileSystemInfos!: MediaFileSystemInfos;

  @Prop()
  fileName!: string;

  @Prop()
  thumbnail!: string;
}

export const MediaSchema = SchemaFactory.createForClass(Media);

// Ex.:
// {
//   "id": "626869d7112892b58d26507a",
//   "productUrl": "https://photos.nicolasmura.com/medias/2000_zuokin_test/subfolder/anotherfolder/IMG_20210103_135639.jpg",
//   "baseUrl": "",
//   "mimeType": "image/jpeg",
//   "mediaMetadata": {
//     "creationTime": "2021-11-11T10:49:29Z",
//     "width": "2976",
//     "height": "3968",
//     "photo": {
//       "cameraMake": "HUAWEI",
//       "cameraModel": "VTR-L09",
//       "focalLength": 3.95,
//       "apertureFNumber": 2.2,
//       "isoEquivalent": 320,
//       "exposureTime": "0.029999999s"
//     },
//     "tags": (...)
//   },
//   "filename": "IMG_20210103_135639.jpg",
//   "thumbnail": "data:image/png;base64, /9j/4AAQSkZJRgABAQAAAQABAAD..."
// }

// {
//   "id": "626869d7112892b58d26507a",
//   "productUrl": "https://photos.google.com/lr/photo/AJBzEYAd94ZXwVkNrTff22M0T2TMLPb_reXEYebQ4sgnIS8X9LPkVn7rJKS7kvXSHA6LeruPA2dJooQK8pBrcOs08AYjpK7drw",
//   "baseUrl": "https://lh3.googleusercontent.com/lr/AFBm1_bQHf5iu8B5Zpc5n0QRUcvUuF6OGYwYgji2qWg7Jj9N1h8-jqPZ3c1Uz3VDlZ1et6HwX13kjIm11ObjlHn-wKqbFoXo_oFTrjiUEcF6R8v38pQTPQ1xsfKZr9onQhnhZ64-peq2eo7epu-Mvo6CkLHnYJD1HUk8zl8ojcJw_GuBz6xwdHbX-z3_EgJFqdHOIJxFnBhOGMknE9MGcLbHTaCowFTefiSz2h19KLLGWWLr9KtfCZXJkv2rpo9RAqaTkow3NgSJ98yTFOwwpfSsiZoU-kiMvOv3Q0r7JfKGYTJtnn-piLGfvc1uUdYiOfR_zBrvK0ikATbyMvswKwwiffdTwDJUU8VrqvP3Zjd9xBcAOhCthRR2Hccqt5_q6v-CnLj7Dho8rwPXl8en0VPjNRbfQ4r_sUhOAz8tIFQdGPoAwOuvQfvg165cRZDclcJh1kEmoB_J9Cx3EFe0WohS0BZLil7FSeg6Zrl1Ucd40kexF4dvdnZltwC0qJfBg-fDh7xVz1zHdcrGPzHH21xFPVcIKbhLWjTk3FE74cwyt_iopk_Arpqt2PuGQ6xLrIy7z8HIzEJbpdG7E82qvWLHjhhe7wBWW_zivJ9Ix0oS-Gw6yJz_3ovFC82HNjhFaTV08HWP3IG5smRNTRVGTzyZYk71BFrpFP6vxfgzvLNSjlQbw7uErM8M16Beyzb2FmMtYHGMCPI-ydXEONhEQ-URgCodD41Pi3id3FNIvwolZwVxoGScZncgRajXST2jdIAzItDU1MBKk6TXLCrCphXwZWWlFna6y1aVLXvpfA",
//   "mimeType": "video/mp4",
//   "mediaMetadata": {
//     "creationTime": "2021-10-30T17:54:46Z",
//     "width": "1080",
//     "height": "1920",
//     "video": {
//       "fps": 29.67860765959896,
//       "status": "READY"
//     }
//   },
//   "filename": "VID_20211030_195447.mp4"
// }
