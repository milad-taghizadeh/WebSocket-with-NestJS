import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from '../../common/utils/logger';
import { CustomConfigModule } from '../config/config.module';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from 'src/config/typeorm.config';
import { ChatGateway } from '../chat/chat.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(process.cwd(), '.env'),
      ignoreEnvFile: false,
    }),
    CustomConfigModule,
    TypeOrmModule.forRoot(TypeOrmConfig()),
    AppModule,
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
