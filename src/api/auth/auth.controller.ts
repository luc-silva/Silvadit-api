import { Body, Controller, Post, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDTO, CreateUserDTO, UpdateUserDTO } from './types/auth.dto';
import { Public } from '~/utils/decorators/protect-routes';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  async login(@Body() data: UserLoginDTO) {
    return await this.authService.login(data);
  }

  @Post('register')
  @Public()
  async createUser(@Body() data: CreateUserDTO) {
    return await this.authService.createUser(data);
  }

  @Put('update')
  async updateUser(@Body() data: UpdateUserDTO) {
    return await this.authService.updateUser(data);
  }
}
