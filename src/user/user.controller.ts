import { Body, Controller, Get, Post, UseGuards, Param, Query, Put, HttpStatus, NotAcceptableException, HttpException } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { MailService } from 'src/mail/mail.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly mailService: MailService,
    ) {}

    // @Get()
    // async findAll(): Promise<User[]> {
    //     return await this.userService.findAll();
    // }
    
    @Post()
    async create(@Body() userData: CreateUserDto): Promise<User> {
        if (await this.userService.findOne(userData.email)) {
            throw new HttpException({ status: HttpStatus.NOT_ACCEPTABLE, message: "이미 존재하는 아이디입니다.\nDuplicate ID"}, HttpStatus.NOT_ACCEPTABLE);
        }
        const { user, token } = await this.userService.create(userData);

        this.mailService.sendSogangAuthenticationMail(user, userData.sogangMail, token.token);
        
        return user;
    }

    // Needs Refactoring (Unclear URL, No Exception Handling)
    @Get(':id')
    async authenticateSogangMail(@Param('id') id: number, @Query('token') token: string) {
        const result = await this.userService.authenticate(id, token);

        if (result) {
            return 'Authentication Success';
        }
        else {
            return 'Authentication Fail';
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id/info')
    async findOneById(@Param('id') id: number): Promise<User> {
        return await this.userService.findOneById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id/password')
    async updatePassword(@Param('id') userId: number, @Body() passwordData: UpdatePasswordDto): Promise<any> {
        return await this.userService.updatePassword(userId, passwordData);
    }
}
