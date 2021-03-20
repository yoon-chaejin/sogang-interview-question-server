import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: {'origin': 'http://localhost:3100',}});
  const configService = app.get(ConfigService);
  app.use(helmet())
  await app.listen(configService.get('PORT'));
}
bootstrap();
