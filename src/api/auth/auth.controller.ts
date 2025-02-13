import { Body, Controller, Post, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  UserLoginDTO,
  UpdatePreRegistrationUserDTO,
  PregistrerUserDTO,
  ConcludeUserRegistrationDTO,
} from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() data: UserLoginDTO) {
    return await this.authService.login(data);
  }

  @Post('register')
  async registerEmail(@Body() data: PregistrerUserDTO) {
    console.log('bateu');
    return await this.authService.validateUserEmail(data);
  }

  @Put('update')
  async updatePreRegistrationData(@Body() data: UpdatePreRegistrationUserDTO) {
    return await this.authService.updateUser(data);
  }
 
  @Post('concludeRegistration')
  async concludeRegistration(@Body() data: ConcludeUserRegistrationDTO) {
    return await this.authService.concludeUserRegistration(data);
  }
}
