import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../../users/entities/user.entity';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      /**
       * we tell the strategy that it is going to sign the token and then encrypt it
       */
      secretOrKey: configService.get('JWT_SECRET'), //This is the sign
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //Where is find the token is send as bearer
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { id } = payload;
    
      const user = await this.authService.validateUser(id);
      return user;
  }
}
