import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: {'origin': ['http://localhost:3100', 'http://13.209.6.144', 'http://www.sogangtree.ml', 'https://www.sogangtree.ml'],}});
  const configService = app.get(ConfigService);
  app.use(helmet())
  await app.listen(configService.get('port'));
}
bootstrap();
