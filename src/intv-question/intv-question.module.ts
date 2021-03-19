import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagModule } from 'src/tag/tag.module';
import { IntvQuestionController } from './intv-question.controller';
import { IntvQuestionService } from './intv-question.service';
import { IntvQuestionRepository } from './repository/IntvQuestionRepository';

@Module({
  imports: [TagModule, TypeOrmModule.forFeature([IntvQuestionRepository])],
  controllers: [IntvQuestionController],
  providers: [IntvQuestionService]
})
export class IntvQuestionModule {}
