import { Controller, Get, Logger, Param, Request } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(
    private usersService: UsersService
  ) {}

  @Get('users/:id')
  async findOne(@Param('id') id: number) {
    return this.usersService.findUserById(id);
  }

  @Get('profile')
  getProfile(@Request() req) {
    Logger.log('**************');
    Logger.log(req.user);
    // return req.user;
    return this.usersService.getCurrentUser();
  }

  @Get('users')
  getUsers(@Request() req) {
    Logger.log('**************');
    Logger.log(req.user);
    // return req.user;
    return this.usersService.findAll();
  }
}
