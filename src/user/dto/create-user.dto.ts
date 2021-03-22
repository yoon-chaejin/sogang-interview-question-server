import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    readonly email: string;

    @IsString()
    readonly password: string;

    @IsString()
    readonly username: string;

    @IsString()
    readonly sogangMail: string;
}