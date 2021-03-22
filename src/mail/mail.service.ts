import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class MailService {
    constructor(
        private readonly mailerService: MailerService
    ) {}

    async sendSogangAuthenticationMail(user: User, mail: string, token: string) {
        console.log('user', user);
        console.log('mail', mail);
        console.log('token', token);

        const url = 'http://localhost:3101/users/'+user.id+'?token='+token;
        console.log('url', url);
        this.mailerService.sendMail({
            to: mail,
            from: 'kevin3st@naver.com',
            subject: 'SignUp Mail (subject)',
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
