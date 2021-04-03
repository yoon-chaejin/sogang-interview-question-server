import { EntityRepository, Repository } from 'typeorm';
import { IntvAnswer } from '../entities/intv-answer.entity';

@EntityRepository(IntvAnswer)
export class IntvAnswerRepository extends Repository<IntvAnswer> {
    findOneByUserId(userId: number, intvQuestionId: number) {
        return this.createQueryBuilder('intvAnswer')
            .leftJoinAndSelect('intvAnswer.user', 'user')
            .leftJoinAndSelect('intvAnswer.intvQuestion', 'intvQuestion')
            .where('user.id = :userId', { userId })
            .andWhere('intvQuestion.id = :intvQuestionId', {intvQuestionId})
            .getOne();
    }
}