import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from '../users/users.service';
import TokenPayload from './tokenPayload.interface';
 
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        console.log(request?.cookies?.Authentication);
        return request?.cookies?.Authentication;
      }]),
      // TODO configurar variáveis de ambiente
      secretOrKey: 'mySecret019238'
    });
  }
 
  async validate(payload: TokenPayload) {
    console.log(payload);
    
    const user = await this.userService.findOne(payload.userId);
    console.log(user);
    
    return user
  }
}