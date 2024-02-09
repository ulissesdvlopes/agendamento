import { Body, ClassSerializerInterceptor, Controller, HttpCode, Post, Req, Res, UseInterceptors } from '@nestjs/common';
import RegisterDto from './dtos/register.dto';
import { AuthService } from './auth.service';
import LoginDto from './dtos/login.dto';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    // @UseInterceptors(ClassSerializerInterceptor)
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @HttpCode(200)
    @Post('login')
    @UseInterceptors(ClassSerializerInterceptor)
    async login(@Body() loginDto: LoginDto, @Req() request: Request) {
        const user = await this.authService.getAuthenticatedUser(loginDto);
        const cookie = this.authService.getCookieWithJwtToken(user);
        request.res.setHeader('Set-Cookie', cookie);

        return user;
    }

}
