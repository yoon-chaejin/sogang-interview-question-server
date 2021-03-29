import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    findOneByEmail(email: string) {
        return this.findOne({ select: ['id', 'email', 'username', 'password', 'isAuthenticated'], where: { email } });
    }

    findOnebyId(id: number) {
        return this.createQueryBuilder('user')
            .where('user.id = :id',  { id })
            .leftJoinAndSelect('user.bookmarks', 'bookmarks')
            .leftJoinAndSelect('user.intvAnswers', 'intvAnswers')
            .leftJoinAndSelect('intvAnswers.intvQuestion', 'intvQuestion')
            .getOne();
    }

    findOneByIdWithPassword(id: number) {
        return this.findOne({ select: ['id', 'email', 'username', 'password', 'isAuthenticated'], where: { id } });
    }
}