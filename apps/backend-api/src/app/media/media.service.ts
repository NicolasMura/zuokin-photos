import { ConflictException, HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Media } from '@zuokin-photos/models';
import { rmdir } from 'fs';

@Injectable()
export class MediaService {
  constructor(
    @InjectModel(Media.name) private mediaModel : Model<Media>,
    private configService: ConfigService
  ) {}

  async findMediaById(id: number): Promise<Media | undefined> {
    const media: Media = await this.mediaModel.findOne({
      _id: new Types.ObjectId(id)
    });

    if (!media) {
      Logger.error(`Media with id ${id} not found`);
      throw new NotFoundException(`Media with id ${id} not found`);
    }

    return media;
  }

  async findAll(): Promise<Media[]> {
    const medias: Media[] = await this.mediaModel.find()
    .exec();

    return medias;
  }

  async createMedia(media: Media): Promise<Partial<Media> | undefined> {
    const newMedia: Media = new this.mediaModel(media);
    Logger.log('newMedia');
    Logger.log(newMedia);

    const existingMedia: Media = await this.mediaModel.findOne({
      fileName: newMedia.fileName
    });

    if (existingMedia) {
      Logger.error(`This media already exists`);
      throw new ConflictException(`This media already exists`);
    }

    let savedMedia: Media;
    try {
      savedMedia = await this.mediaModel.create(newMedia);
    } catch (error) {
      Logger.error(error);
      // throw new BadRequestException(error);
      throw new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: error
      }, HttpStatus.BAD_REQUEST);
    }

    Logger.log('savedMedia:');
    Logger.log(savedMedia);

    return savedMedia;
  }

  async deleteAllMedias(): Promise<Media[]> {
    const result: any = await this.mediaModel.deleteMany()
    .exec();

    rmdir(`${this.configService.get<string>('UPLOAD_FOLDER_TMP')}/medias`, { recursive: true }, (err) => {
    if (err) {
        throw err;
    }

    console.log(`${this.configService.get<string>('UPLOAD_FOLDER_TMP')}/medias is deleted!`);
});

    return result;
  }
}
