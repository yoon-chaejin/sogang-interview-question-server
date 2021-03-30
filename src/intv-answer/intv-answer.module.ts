import { Module } from '@nestjs/common';
import { IntvAnswerService } from './intv-answer.service';
import { IntvAnswerController } from './intv-answer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IntvAnswerRepository } from './repository/intvAnswerRepository';

@Module({
  imports: [TypeOrmModule.forFeature([IntvAnswerRepository])],
  providers: [IntvAnswerService],
  controllers: [IntvAnswerController]
})
export class IntvAnswerModule {}
