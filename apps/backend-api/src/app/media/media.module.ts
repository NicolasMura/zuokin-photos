import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { MongooseModule } from '@nestjs/mongoose';
import { Media, MediaSchema } from '@zuokin-photos/models';
import { diskStorage } from 'multer';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { mkdirSync } from 'fs';
import { editFileName, imageFileFilter } from './utils/file-upload.utils';

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
            const path = `${configService.get<string>(
              'UPLOAD_FOLDER_TMP'
            )}/${file.originalname.split('/').slice(0, -1).join('/')}`;
            console.log(path);
            if (path) {
              mkdirSync(path, { recursive: true });
            }
            return cb(null, configService.get<string>('UPLOAD_FOLDER_TMP'));
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
