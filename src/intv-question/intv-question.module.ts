import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IntvAnswerRepository } from 'src/intv-answer/repository/intvAnswerRepository';
import { TagModule } from 'src/tag/tag.module';
import { UserModule } from 'src/user/user.module';
import { IntvQuestionController } from './intv-question.controller';
import { IntvQuestionService } from './intv-question.service';
import { IntvQuestionRepository } from './repository/IntvQuestionRepository';

@Module({
  imports: [
    TagModule,
    UserModule,
    TypeOrmModule.forFeature([IntvQuestionRepository, IntvAnswerRepository])],
  controllers: [IntvQuestionController],
  providers: [IntvQuestionService]
})
export class IntvQuestionModule {}
