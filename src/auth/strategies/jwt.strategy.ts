import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('secret')
    });
  }

  async validate(payload: any) {
    console.log('User Validation', payload, payload.userid, payload.username, payload.useremail);
    if (!payload.userid || !payload.useremail || !payload.username) {
      throw new UnauthorizedException();
    }
    return { userid: payload.userid, useremail: payload.useremail, username: payload.username };
  }
}