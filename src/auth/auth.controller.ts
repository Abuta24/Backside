import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up-dto';
import { SignInDto } from './dto/sign-in-dto';
import { AuthGuard } from './auth.guard';
import { CurrentUser } from 'src/user/user.decorator';
import { CurrentUserDto } from 'src/user/dto/currentUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() signupdto: SignUpDto) {
    return this.authService.signUp(signupdto);
  }

  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @UseGuards(AuthGuard)
  @Get('getCurrentUser')
  getCurrentUser(@CurrentUser() user: CurrentUserDto) {
    return this.authService.getCurrentUser(user);
  }
}
