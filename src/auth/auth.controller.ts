import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import RegisterDto from './dtos/register.dto';
import { AuthService } from './auth.service';
import LoginDto from './dtos/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto)
    }

    @HttpCode(200)
    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.getAuthenticatedUser(loginDto)
    }

}
