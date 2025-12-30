import { Body, Controller, Post, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  UserLoginDTO,
  CreateUserDTO,
  UpdateUserEmailDTO,
} from './types/auth.dto';
import { Public } from '~/utils/decorators/protect-routes/PublicDecorator';
import { ExtractUser } from '~/utils/decorators/extract-user';

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

  @Put('update/email')
  async updateUserEmail(
    @Body() data: UpdateUserEmailDTO,
    @ExtractUser() session: ISession,
  ) {
    return await this.authService.updateUserEmail(data, session);
  }
}
