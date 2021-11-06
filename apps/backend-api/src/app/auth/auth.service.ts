import { BadRequestException, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthValidation } from './auth.validation';
import { UsersService } from '../users/users.service';
import { User } from '@zuokin-photos/models';
import { LoginResponse } from '@zuokin-photos/models';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private authValidation: AuthValidation
  ) {}

  async validateUser(username: string, pass: string): Promise<Partial<User>> {
    Logger.log('*********** AuthService - validateUser');
    Logger.log(username);
    Logger.log(pass);

    const user: User = await this.usersService.findUserByEmail(username);
    // Logger.log(user);

    const isMatched: boolean = await user.comparePassword(pass);

    Logger.log(isMatched);
    if (isMatched) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;

      const docResult = result['_doc'];
      delete docResult['password'];

      return docResult;
    } else {
      Logger.error('Bad password');
    }

    throw new HttpException({
      statusCode: HttpStatus.UNAUTHORIZED,
      message: 'Bad password',
    }, HttpStatus.UNAUTHORIZED);
    // return null;
  }

  async login(user: User): Promise<LoginResponse> {
    Logger.log('*********** AuthService - login');
    // Logger.log(user);
    const payload = {
      sub: user._id,
      username: user.username,
      email: user.email,
      mobile: user.mobile,
      isAdmin: user.isAdmin,
      profile: user.profile
    };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: jwtConstants.secret
        // expiresIn: '60m'
      }),
      status: 200,
      logged: true,
      message: 'Sign in successfull'
    };
  }

  async signup(user: User): Promise<Partial<User>> {
    Logger.log('*********** AuthService - signup');
    Logger.log(user);

    const validate = this.authValidation.createUser(user);

    console.log('validate.error');
    console.log(validate.error);
    if (validate.error) {
      Logger.error(validate.error.message);
      throw new BadRequestException(validate.error.message);
    }

    const newUser: Partial<User> = await this.usersService.createUser(user);

    // delete newUser['password'];

    return newUser;
  }
}
