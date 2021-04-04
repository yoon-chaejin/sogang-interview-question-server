import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './repository/UserRepository';
import * as Bcrypt from 'bcrypt';
import { TokenRepository } from './repository/TokenRepository';
import { randomBytes } from 'crypto';
import { Token } from './entities/token.entity';
import { UserWithTokenDto } from './dto/user-with-token.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

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

    async findOneById(id: number): Promise<User> {
        return await this.userRepository.findOnebyId(id);
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
    
    async authenticate(id: number, token: string) {
        const userWithToken = await this.userRepository
            .createQueryBuilder('user')
            .innerJoinAndSelect('user.token', 'token')
            .where('user.id = :id', { id: id })
            .getOne();
        
        if (token === userWithToken.token.token) {
            userWithToken.isAuthenticated = true;
            await this.userRepository.save(userWithToken);
            return true;
        }

        return false;
    }

    async updatePassword(userId: number, passwordData: UpdatePasswordDto): Promise<any> {
        const user = await this.userRepository.findOneByIdWithPassword(userId);
        const { password, newPassword } = passwordData;

        if (user && await Bcrypt.compare(password, user.password)) {
            const salt: string = await Bcrypt.genSalt();
            const hashedPassword = await Bcrypt.hash(newPassword, salt);
            user.password = hashedPassword;
            await this.userRepository.save(user);
        } else {
            throw new UnauthorizedException();
        }
    }

    async resetPassword(userId: number, passwordData: ResetPasswordDto) {
        const user = await this.userRepository.findOneByIdWithPassword(userId);
        const { password, newPassword } = passwordData;

        if (user && password == 'SG1q2w3e4r5t^') {
            const salt: string = await Bcrypt.genSalt();
            const hashedPassword = await Bcrypt.hash(newPassword, salt);
            user.password = hashedPassword;
            await this.userRepository.save(user);

            user.password = '';
            return user;
        } else {
            throw new UnauthorizedException();
        }
    }
}
