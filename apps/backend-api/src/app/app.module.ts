import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { MediaModule } from './media/media.module';
import { AllExceptionsFilter } from './utilities/all-exceptions.filter';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri:
          configService.get<string>('MONGODB_URI') +
          configService.get<string>('MONGODB_DB_MAIN'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    MediaModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // Enable authentication globally :
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    // Register a global-scope filter directly to help debugging
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter
    }
  ],
})
export class AppModule {}
