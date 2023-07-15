import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDTO } from './dto/signUp.dto';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/signIn.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() body: SignUpDTO) {
    return this.authService.signUp(body);
  }

  @Post('signin')
  signIn(@Body() body: SignInDTO) {
    return this.authService.signIn(body);
  }
}
