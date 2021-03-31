import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class MailService {
    constructor(
        private readonly mailerService: MailerService,
        private readonly configService: ConfigService,
    ) {}

    async sendSogangAuthenticationMail(user: User, mail: string, token: string) {
        console.log('user', user);
        console.log('mail', mail);
        console.log('token', token);

        const url = this.configService.get('url') + 'users/'+user.id+'?token='+token;
        console.log('url', url);
        this.mailerService.sendMail({
            to: mail,
            from: this.configService.get('nodemailer.user'),
            subject: '서강트리 본인 인증 메일',
            template: 'sign-up',
            context: {
                username: user.username,
                signUpUrl: url,
            }
        })
        .then((response) => {console.log(response)})
        .catch(() => {})
    }
}
