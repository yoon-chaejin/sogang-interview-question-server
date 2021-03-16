import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: {'origin': 'http://localhost:3100',}});
  app.use(helmet())
  await app.listen(3101);
}
bootstrap();
