import { Controller, Get, Logger, Param, Request } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService
  ) {}

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.usersService.findUserById(id);
  }

  @Get('current')
  getProfile(@Request() req) {
    Logger.log('**************');
    Logger.log(req.user);
    // return req.user;
    return this.usersService.getCurrentUser();
  }

  @Get('')
  getUsers(@Request() req) {
    Logger.log('**************');
    Logger.log(req.user);
    // return req.user;
    return this.usersService.findAll();
  }
}
