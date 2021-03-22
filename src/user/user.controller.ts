import { Body, Controller, Get, Post, UseGuards, Param, Query } from '@nestjs/common';
import { MailService } from 'src/mail/mail.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly mailService: MailService,
    ) {}

    @Get()
    async findAll(): Promise<User[]> {
        return await this.userService.findAll();
    }
    
    @Post()
    async create(@Body() userData: CreateUserDto): Promise<User> {
        const { user, token } = await this.userService.create(userData);

        this.mailService.sendSogangAuthenticationMail(user, userData.sogangMail, token.token);
        
        return user;
    }
}
