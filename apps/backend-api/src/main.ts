import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // get env variables from .env file through ConfigService
  const config =  app.get(ConfigService);

  // configure CORS
  const ALLOWED_CORS: string = config.get<string>('ALLOWED_CORS');
  if(ALLOWED_CORS) {
    let whitelist: string[];
    try {
      whitelist = ALLOWED_CORS.split(',');
    } catch (e) {
      Logger.error('Error while retrieving ALLOWED_CORS variable...');
    }
    if (whitelist?.length > 0) {
      app.enableCors({
        origin: whitelist
        // credentials: true,
      });
    }
  }

  // serve static files
  console.log(__dirname);
  console.log(process.cwd());
  // app.useStaticAssets(join(__dirname, '..', 'files'));
  app.useStaticAssets(join(process.cwd(), config.get<string>('UPLOAD_FOLDER_TMP')));

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  // const port = process.env.PORT || 3333;
  const port = config.get<number>('NODE_PORT') || 3333;
  await app.listen(port, () => {
    Logger.log(`Running in <${config.get<string>('NODE_ENV')}> environment`);
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
