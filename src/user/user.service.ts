import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './repository/UserRepository';
import * as Bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: UserRepository,
    ) {}

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findOne(email: string): Promise<User> {
        return await this.userRepository.findOneByEmail(email);
    }

    async create(userData: CreateUserDto): Promise<User> {
        const { email, password, username } = userData;

        const salt: string = await Bcrypt.genSalt();
        const hashedPassword = await Bcrypt.hash(password, salt);

        const user = new User();
        user.email = email;
        user.password = hashedPassword;
        user.username = username;

        await this.userRepository.save(user);

        return user;
    }
}
