import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagService } from 'src/tag/tag.service';
import { UserService } from 'src/user/user.service';
import { CreateIntvQuestionDto } from './dto/create-intv-question.dto';
import { CreateIntvQuestionsWithTagsDto } from './dto/create-intv-questions-with-tags.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';
import { IntvQuestion } from './entities/intv-question.entity';
import { IntvQuestionRepository } from './repository/IntvQuestionRepository';

@Injectable()
export class IntvQuestionService {
    constructor (
        @InjectRepository(IntvQuestion)
        private readonly intvQuestionRepository: IntvQuestionRepository,
        private tagService: TagService,
        private userService: UserService,
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
            .leftJoin('intv_question.intvAnswers', 'intvAnswers')
            .addSelect('COUNT(intvAnswers.id) AS intvAnswerCount')
            .where('tag.id = :id', { id: id})
            .groupBy('intv_question.id')
            .getRawMany();
    }

    async updateBookmark(bookmarkData: UpdateBookmarkDto): Promise<any> {
        const { userId, intvQuestionId } = bookmarkData;

        const intvQuestion = await this.intvQuestionRepository.findOneByIdWithBookmarkedUsers(intvQuestionId);

        if (intvQuestion.bookmarkedUsers.find(item => item.id == userId) == undefined) { // bookmark
            const user = await this.userService.findOneById(userId);
            intvQuestion.bookmarkedUsers = intvQuestion.bookmarkedUsers.concat(user);
            await this.intvQuestionRepository.save(intvQuestion);
        } else { // un-bookmark
            intvQuestion.bookmarkedUsers = intvQuestion.bookmarkedUsers.filter(item => item.id != userId)
            await this.intvQuestionRepository.save(intvQuestion);
        }

        return;
    }
}
