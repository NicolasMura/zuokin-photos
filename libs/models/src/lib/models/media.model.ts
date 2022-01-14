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
  filename!: string;
}

export const MediaSchema = SchemaFactory.createForClass(Media);

// Ex.:
// {
//   "id": "AJBzEYDNxc4a8I5NprpBXtK3d4gb7o1XjZ_EZuquCQoCd-J5d7djRQqWCFedAHHOXQ0GlwhOAiGbxmVjBY5wn0dltvuGfjH67w",
//   "productUrl": "https://photos.google.com/lr/photo/AJBzEYDNxc4a8I5NprpBXtK3d4gb7o1XjZ_EZuquCQoCd-J5d7djRQqWCFedAHHOXQ0GlwhOAiGbxmVjBY5wn0dltvuGfjH67w",
//   "baseUrl": "https://lh3.googleusercontent.com/lr/AFBm1_ZPMFbBwpCq87rhBLnPNPTLDnotoSRk1QdQ1b3nJM5aucSB5_OYtWmqBti6jhOX_5BlLr2WaojLK80ACpRmqdLSkOEQSScgueA0lhc0MKq63NsmSt-C8vdierKTePTScBLzvWuIKF3jqRqa0pN0wh7E-BHbHzwya3QnwV_mMVvBgqiTWg0C3zZuQ_fOgN89ps_HX2cUyyggrlhQyAS_rXLaGztQtczFO2sSDZAmQdVrSztZdCv-nQOc0I5DWrUE5BGDHv3DJFL7MTYwno3IN4MmS7zQbAe07qR7iPo-dovQ6_dhCeqb9RA4RqzORTLVs1De15oUUOCY1QJzo4Y71YsOV0yyHCDLP88aes8chn3Roii2LkmBS4IY095PLWyqYEpO74S74-7I3I1XmZIaR4j5pK8RacKIuJrL2BYzqhPR0A8zZG-aaKPKukqaei1JVbcaenplq2UteRI-1zWzvZCEMd2t2nEE5bR-jxO25tV8NVFiUx87ZfrQ9vqZPFArQHeV3JZH8orGQKdT9s3kZ27K5HHjHe9oNDqJ_3fqnPPRJRKZucaabX_42wyt7vyI8gdJR2-tum9Xtn-Jp-Jk6SOb1bzOSYuANJAaMiZ2L6dyPYbmaLc8N0R1zwQQvV0iKC3nNoKl3qoDw03Xgviu0PfNCVoR_nlKXfDWNeSAiYCnQg4JmaPZXzzxNZr9rJ3KX1SmckHuS_cAP7lY4Dp2Vywt4wjJ5uzam_8-8KlQOTctI-wEqK7_PVl4rcCxshmq_NmHcICtEC_6gi0QBpV69V3TFZi6ZfYed62znQ",
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
//     }
//   },
//   "filename": "IMG_20211111_114928.jpg"
// }

// {
//   "id": "AJBzEYAd94ZXwVkNrTff22M0T2TMLPb_reXEYebQ4sgnIS8X9LPkVn7rJKS7kvXSHA6LeruPA2dJooQK8pBrcOs08AYjpK7drw",
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
