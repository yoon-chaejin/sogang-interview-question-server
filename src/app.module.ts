import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { IntvQuestionModule } from './intv-question/intv-question.module';
import { TagModule } from './tag/tag.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import * as Joi from 'joi';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailService } from './mail/mail.service';
import { MailModule } from './mail/mail.module';
import { IntvAnswerModule } from './intv-answer/intv-answer.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.dev.env', '.prod.env'],
      load: [configuration],
      isGlobal: true,
      validationSchema: Joi.object({
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_SCHEMA: Joi.string().required(),
      })
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => (configService.get('database')),
      inject: [ConfigService],
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        transport: {
          service: 'naver',
          host: 'smtp.naver.com',
          port: 587,
          secure: false,
          auth: {
            user: configService.get('nodemailer.user'),
            pass: configService.get('nodemailer.password'),
          }
        },
        defaults: {
          from: '"nest-modules" <modules@nestjs.com>'
        },
        template: {
          dir: __dirname + '/../src/templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          }
        }
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    IntvQuestionModule,
    TagModule,
    MailModule,
    IntvAnswerModule,
  ],
  controllers: [AppController],
  providers: [AppService, MailService],
})
export class AppModule {}
