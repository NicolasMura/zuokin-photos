import { Controller, Get, Post, Body, Logger, Param, Request } from '@nestjs/common';
import { Media } from '@zuokin-photos/models';
import { MediaService } from './media.service';

@Controller('medias')
export class MediaController {
  constructor(
    private mediaService: MediaService
  ) {}

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.mediaService.findMediaById(id);
  }

  @Get('')
  getMedias(@Request() req) {
    Logger.log('**************');
    Logger.log(req.user);
    // return req.user;
    return this.mediaService.findAll();
  }

  @Post('')
  async createMedia(@Body() media: Media) {
    return this.mediaService.createMedia(media);
  }
}
