import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import RegisterDto from './dtos/register.dto';
import LoginDto from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import TokenPayload from './tokenPayload.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    public async register(registrationData: RegisterDto) {
        const hashedPassword = await bcrypt.hash(registrationData.password, 10);
        try {
          const createdUser = await this.usersService.create({
            ...registrationData,
            password: hashedPassword
          });
        //   createdUser.password = undefined;
          return createdUser;
        } catch (error) {
          throw new HttpException('Algum problema ocorreu', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public async getAuthenticatedUser(loginDto: LoginDto) {
        try {
            const user: User = await this.usersService.getByEmail(loginDto.email);
            const isPasswordMatching = await bcrypt.compare(
                loginDto.password,
                user.password
            );
            if (!isPasswordMatching) {
                throw new HttpException('E-mail ou senha incorretos', HttpStatus.BAD_REQUEST);
            }
            //   user.password = undefined;
            return user;
        } catch (error) {
            throw new HttpException('E-mail ou senha incorretos', HttpStatus.BAD_REQUEST);
        }
    }

    // TODO configurar variáveis de ambiente
    public getCookieWithJwtToken(user: User) {
        const payload: TokenPayload = { userId: user.id };
        const token = this.jwtService.sign(payload, {secret: 'mySecret019238'});
        return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${5 * 60 * 1000}`;
    }
}
