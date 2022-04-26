// Help in debugging: https://maximorlov.com/fix-unexpected-field-error-multer/
import { Lexer } from '@angular/compiler';
import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Logger,
  Param,
  Request,
  SetMetadata,
  UseInterceptors,
  UploadedFiles,
  Res,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Media } from '@zuokin-photos/models';
import { MediaService } from './media.service';

// Create a custom decorator using the SetMetadata decorator factory function (used for declaring routes as public)
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);


// @UseFilters(AllExceptionsFilter)
@Controller('medias')
export class MediaController {
  constructor(
    private configService: ConfigService,
    private mediaService: MediaService
  ) {}

  // @Get(':id')
  // async findOne(@Param('id') id: number) {
  //   console.log(id);
  //   return this.mediaService.findMediaById(id);
  // }

  // @Public()
  @Get('')
  getMedias(@Request() req) {
    Logger.log('**************');
    Logger.log(req.user);
    // return req.user;
    return this.mediaService.findAll();
  }

  // @Public()
  @Post('')
  async createMedia(@Body() media: Media) {
    console.log(media);
    return this.mediaService.createMedia(media);
  }

  // @Public()
  @Post('upload-multiple')
  @UseInterceptors(
    FilesInterceptor('files[]')
  )
  uploadFiles(
    @Body() body: { test: any },
    @UploadedFiles() files: Express.Multer.File[]
  ) {
    // console.log(JSON.parse(body.test));
    // console.log(files);
    // return this.mediaService.createMedia(media);
    // return 'Done';

    const response = [];
    files.forEach((file) => {
      const fileReponse = {
        originalname: file.originalname,
        filename: file.filename,
      };
      response.push(fileReponse);
    });
    return response;
  }

  @Public()
  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') imgpath, @Res() res) {
    console.log(imgpath);
    return res.sendFile(imgpath, { root: this.configService.get<string>('UPLOAD_FOLDER_TMP') });
  }

  @Get('track/:imgId')
  test(@Param('imgId') imgId, @Res() res) {
    const imgPath = 'bob.jpg';
    // const imgPath = await this.mediaService.findMediaById(imgId);
    return res.sendFile(imgPath, { root: this.configService.get<string>('UPLOAD_FOLDER_TMP') });
  }

  // @Public()
  @Delete('')
  async deleleAllMedias() {
    console.log('Delete all medias!');
    return this.mediaService.deleteAllMedias();
  }
}
