import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateIntvQuestionDto } from './dto/create-intv-question.dto';
import { IntvQuestion } from './entities/intv-question.entity';
import { IntvQuestionRepository } from './repository/IntvQuestionRepository';

@Injectable()
export class IntvQuestionService {
    constructor (
        @InjectRepository(IntvQuestion)
        private readonly intvQuestionRepository: IntvQuestionRepository,
    ) {}

    async findAll(): Promise<IntvQuestion []> {
        return await this.intvQuestionRepository.find();
    }

    async findOneById(id: number): Promise<IntvQuestion> {
        return await this.intvQuestionRepository.findOneById(id);
    }

    async create(intvQuestionData: CreateIntvQuestionDto): Promise<IntvQuestion[]> {
        const { content } = intvQuestionData;

        const intvQuestions = []
        for ( const item of content) {
            const intvQuestion = new IntvQuestion();
            intvQuestion.content = item;
            intvQuestions.push(intvQuestion);
        }

        await this.intvQuestionRepository.save(intvQuestions);

        return intvQuestions;
    } 
}
