import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './repository/UserRepository';
import * as Bcrypt from 'bcrypt';
import { TokenRepository } from './repository/TokenRepository';
import { randomBytes } from 'crypto';
import { Token } from './entities/token.entity';
import { UserWithTokenDto } from './dto/user-with-token.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: UserRepository,
        private readonly tokenRepository: TokenRepository,
    ) {}

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findOne(email: string): Promise<User> {
        return await this.userRepository.findOneByEmail(email);
    }

    async create(userData: CreateUserDto): Promise<UserWithTokenDto> {
        const { email, password, username } = userData;

        const salt: string = await Bcrypt.genSalt();
        const hashedPassword = await Bcrypt.hash(password, salt);
        
        const token = new Token();
        token.token = randomBytes(20).toString('hex');
        token.ttl = 300; // 5 minutes
        await this.tokenRepository.save(token);

        const user = new User();
        user.email = email;
        user.password = hashedPassword;
        user.username = username;
        user.token = token;

        await this.userRepository.save(user);

        user.password = '';

        return { user, token };
    }
}
