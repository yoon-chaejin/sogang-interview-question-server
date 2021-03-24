import { EntityRepository, Repository } from 'typeorm';
import { IntvQuestion } from '../entities/intv-question.entity';

@EntityRepository(IntvQuestion)
export class IntvQuestionRepository extends Repository<IntvQuestion> {
    findOneById(id: number) {
        return this.findOne(id, {relations: ["tags", "intvAnswers"]});
    }
}