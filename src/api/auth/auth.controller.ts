import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() data: ILoginData) {
    return await this.authService.login(data);
  }

  @Post('register')
  async register(@Body() data: ILoginData) {
    return await this.authService.createUser();
  }
}
