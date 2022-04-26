import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { MongooseModule } from '@nestjs/mongoose';
import { Media, MediaSchema } from '@zuokin-photos/models';
import { mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { editFileName, imageFileFilter } from './utils/file-upload.utils';

const MEDIA_FOLDER = 'medias';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Media.name, schema: MediaSchema },
    ]),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        storage: diskStorage({
          destination: (req, file, cb) => {
            console.log(file);
            // construct file path, for example if file.originalname = '2000_zuokin_test/subfolder/anotherfolder/VID_20210119_185349.mp4',
            // then target folder path = '<UPLOAD_FOLDER_TMP>/2000_zuokin_test/subfolder/anotherfolder'
            const path = `${configService.get<string>(
              'UPLOAD_FOLDER_TMP'
            )}/${MEDIA_FOLDER}/${file.originalname.split('/').slice(0, -1).join('/')}`;
            console.log(path);
            if (path) {
              mkdirSync(path, { recursive: true });
            }
            return cb(null, `${configService.get<string>('UPLOAD_FOLDER_TMP')}/${MEDIA_FOLDER}`);
          },
          filename: editFileName,
        }),
        fileFilter: imageFileFilter,
        preservePath: true,
      }),
      inject: [ConfigService],
    })
  ],
  providers: [MediaService],
  controllers: [MediaController],
  exports: [MediaService]
})
export class MediaModule {}
