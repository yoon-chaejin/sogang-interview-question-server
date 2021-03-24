import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IntvAnswerRepository } from 'src/intv-answer/repository/intvAnswerRepository';
import { TagModule } from 'src/tag/tag.module';
import { IntvQuestionController } from './intv-question.controller';
import { IntvQuestionService } from './intv-question.service';
import { IntvQuestionRepository } from './repository/IntvQuestionRepository';

@Module({
  imports: [TagModule, TypeOrmModule.forFeature([IntvQuestionRepository, IntvAnswerRepository])],
  controllers: [IntvQuestionController],
  providers: [IntvQuestionService]
})
export class IntvQuestionModule {}
