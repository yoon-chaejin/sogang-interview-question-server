import { Module } from '@nestjs/common';
import { IntvAnswerService } from './intv-answer.service';
import { IntvAnswerController } from './intv-answer.controller';

@Module({
  providers: [IntvAnswerService],
  controllers: [IntvAnswerController]
})
export class IntvAnswerModule {}
