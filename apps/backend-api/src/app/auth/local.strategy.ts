import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { User } from '../users/user.schema';
import { User } from '@zuokin-photos/models';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'password'
    });
  }

  async validate(username: string, password: string): Promise<Partial<User>> {
    Logger.log('LocalStrategy extends PassportStrategy - validate');
    const user = await this.authService.validateUser(username, password);

    if (!user) {
      Logger.error('validation error: no user');
      throw new UnauthorizedException();
    }
    return user;
  }
}
