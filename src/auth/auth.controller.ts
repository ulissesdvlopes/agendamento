import { Body, ClassSerializerInterceptor, Controller, HttpCode, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import RegisterDto from './dtos/register.dto';
import { AuthService } from './auth.service';
import LoginDto from './dtos/login.dto';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import RequestWithUser from './requestWithUser.interface';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    @UseInterceptors(ClassSerializerInterceptor)
    async register(@Body() registerDto: RegisterDto, @Req() request: Request) {
        const user = await this.authService.register(registerDto);
        const cookie = this.authService.getCookieWithJwtToken(user);
        request.res.setHeader('Set-Cookie', cookie);

        return user
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

    @UseGuards(AuthGuard('jwt'))
    @Post('logout')
    async logout(@Req() request: RequestWithUser, @Res() response: Response) {
        response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
        return response.sendStatus(200);
    }

}
