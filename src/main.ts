import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { swaggerConfigInit } from './config/swagger.config';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  swaggerConfigInit(app);
  app.use(cookieParser(process.env.COOKIE_SECRET));
  const configService = app.get(ConfigService);
  const serverPort = configService.get('App.SERVER_PORT');
  const swaggerEP = configService.get('App.SWAGGER_ENDPOINT');
  // app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    credentials: true,
    origin: '*',
  });
  await app.listen(serverPort, () => {
    console.log(`Application successfuly started on PORT: ${serverPort}`);
    console.log(`Watch API doc at http://localhost:${serverPort}/${swaggerEP}`);
  });
}
bootstrap();
