import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagService } from 'src/tag/tag.service';
import { CreateIntvQuestionDto } from './dto/create-intv-question.dto';
import { CreateIntvQuestionsWithTagsDto } from './dto/create-intv-questions-with-tags.dto';
import { IntvQuestion } from './entities/intv-question.entity';
import { IntvQuestionRepository } from './repository/IntvQuestionRepository';

@Injectable()
export class IntvQuestionService {
    constructor (
        @InjectRepository(IntvQuestion)
        private readonly intvQuestionRepository: IntvQuestionRepository,
        private tagService: TagService,
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

    async createIntvQuestionsWithTags(intvQuestionsWithTags: CreateIntvQuestionsWithTagsDto) {
        const { newItems } = intvQuestionsWithTags;
        for (const item of newItems) {
            const { category, questions } = item;

            const tag = await this.tagService.findOrCreateTagByTagName(category);
            
            for (const question of questions) {
                const intvQuestion = new IntvQuestion();
                intvQuestion.content = question;
                intvQuestion.tags = [tag];
                await this.intvQuestionRepository.save(intvQuestion);
            }
        }
        return;
    }

    async findByTagId(id: number): Promise<IntvQuestion []> {
        return await this.intvQuestionRepository
            .createQueryBuilder('intv_question')
            .leftJoinAndSelect('intv_question.tags', 'tag')
            .where('tag.id = :id', { id: id})
            .getMany();
    }
}
