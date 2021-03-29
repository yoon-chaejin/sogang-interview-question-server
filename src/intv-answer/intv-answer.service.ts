import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';
import { CreateIntvAnswerDto } from './dto/create-intv-answer.dto';
import { IntvAnswer } from './entities/intv-answer.entity';
import { IntvAnswerRepository } from './repository/intvAnswerRepository';

@Injectable()
export class IntvAnswerService {
    constructor (
        @InjectRepository(IntvAnswer)
        private readonly intvAnswerRepository: IntvAnswerRepository,
    ) {}

    async create(intvAnswerData: CreateIntvAnswerDto): Promise<IntvAnswer> {
        const { userId, intvQuestionId, content } = intvAnswerData;

        let intvAnswer = await this.intvAnswerRepository.findOneByUserId(userId);
        
        if (!intvAnswer) {
            intvAnswer = new IntvAnswer();
        }
        intvAnswer.content = content;
        const result = await this.intvAnswerRepository.save(intvAnswer);

        await this.intvAnswerRepository
            .createQueryBuilder()
            .relation(IntvAnswer, 'intvQuestion')
            .of(result.id)
            .set(intvQuestionId);

        await this.intvAnswerRepository
            .createQueryBuilder()
            .relation(IntvAnswer, 'user')
            .of(result.id)
            .set(userId);

        return result;
    } 

    async updateIntvAnswer(id: number, content: string): Promise<IntvAnswer> {
        const intvAnswer = await this.intvAnswerRepository.findOne(id);
        intvAnswer.content = content;
        return await this.intvAnswerRepository.save(intvAnswer);
    }

    async deleteIntvAnswer(id: number): Promise<DeleteResult> {
        return await this.intvAnswerRepository.delete({ id });
    }
}
