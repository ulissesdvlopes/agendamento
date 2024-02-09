import { Body, Controller, HttpCode, Post, Res, UseGuards } from '@nestjs/common';
import RegisterDto from './dtos/register.dto';
import { AuthService } from './auth.service';
import LoginDto from './dtos/login.dto';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @HttpCode(200)
    // @UseGuards(AuthGuard('jwt'))
    @Post('login')
    async login(@Body() loginDto: LoginDto, @Res() response: Response) {
        const user = await this.authService.getAuthenticatedUser(loginDto);
        const cookie = this.authService.getCookieWithJwtToken(user);
        response.setHeader('Set-Cookie', cookie);

        return response.send(user);
    }

}
