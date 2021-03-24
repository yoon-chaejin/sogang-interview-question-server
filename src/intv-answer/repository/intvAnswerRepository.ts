import { EntityRepository, Repository } from 'typeorm';
import { IntvAnswer } from '../entities/intv-answer.entity';

@EntityRepository(IntvAnswer)
export class IntvAnswerRepository extends Repository<IntvAnswer> {
}