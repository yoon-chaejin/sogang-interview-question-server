import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
        const { questionId, content } = intvAnswerData;

        const intvAnswer = new IntvAnswer();
        intvAnswer.content = content;
        const result = await this.intvAnswerRepository.save(intvAnswer);

        await this.intvAnswerRepository
            .createQueryBuilder()
            .relation(IntvAnswer, 'intvQuestion')
            .of(result.id)
            .set(questionId)

        return result;
    } 

}
