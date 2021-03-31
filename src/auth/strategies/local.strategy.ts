import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({ usernameField: 'email' });
    }

    async validate(username: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException();
        }
        if (!user.isAuthenticated) {
            throw new HttpException('서강 메일을 통해 본인 인증 후 로그인 해주세요.\n\n인증 메일이 오지 않는 경우, sogang-tree@naver.com으로 문의주세요.', HttpStatus.UNAUTHORIZED);
        }
        return user;
    }

}