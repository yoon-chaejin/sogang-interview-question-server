import { EntityRepository, Repository } from 'typeorm';
import { IntvAnswer } from '../entities/intv-answer.entity';

@EntityRepository(IntvAnswer)
export class IntvAnswerRepository extends Repository<IntvAnswer> {
    findOneByUserId(userId: number) {
        return this.createQueryBuilder('intvAnswer')
            .leftJoinAndSelect('intvAnswer.user', 'user')
            .where('user.id = :userId', { userId })
            .getOne();
    }
}