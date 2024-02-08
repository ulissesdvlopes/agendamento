import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import RegisterDto from './dtos/register.dto';
import LoginDto from './dtos/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
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
            console.log(loginDto.email);
            const user = await this.usersService.getByEmail(loginDto.email);
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
            // console.log(error);
            throw new HttpException('E-mail ou senha incorretos', HttpStatus.BAD_REQUEST);
        }
      }
}
