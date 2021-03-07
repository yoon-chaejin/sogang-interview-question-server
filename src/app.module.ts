import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { config } from './orm.config';
import { AuthModule } from './auth/auth.module';
import { IntvQuestionModule } from './intv-question/intv-question.module';
@Module({
  imports: [TypeOrmModule.forRoot(config), AuthModule, IntvQuestionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
