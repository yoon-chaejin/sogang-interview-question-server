import { EntityRepository, Repository } from 'typeorm';
import { IntvQuestion } from '../entities/intv-question.entity';

@EntityRepository(IntvQuestion)
export class IntvQuestionRepository extends Repository<IntvQuestion> {
    findOneById(id: number) {
        //eturn this.findOne(id, {relations: ["tags", "intvAnswers", "bookmarkedUsers"]});
        return this.createQueryBuilder('intvQuestion')
            .leftJoinAndSelect('intvQuestion.tags', 'tags')
            .leftJoinAndSelect('intvQuestion.intvAnswers', 'intvAnswers')
            .leftJoinAndSelect('intvQuestion.bookmarkedUsers', 'bookmarkedUsers')
            .leftJoinAndSelect('intvAnswers.user', 'user')
            .where({ id })
            .getOne()
    }

    findOneByIdWithBookmarkedUsers(id: number) {
        return this.findOne(id, {relations: ["bookmarkedUsers"]})
    }
}