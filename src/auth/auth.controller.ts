import { Controller, Get, Post, Body, UseGuards, HttpCode } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { GetUser } from './decorators/get-user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }
  @Post('login')
  @HttpCode(200)
  loginUser(@Body() createUserDto: LoginUserDto) {
    return this.authService.login(createUserDto);
  }

  @Get('renew')
  @UseGuards(AuthGuard())
  renew(@GetUser() user: User) {
    return this.authService.renewToken(user);
  }

}
