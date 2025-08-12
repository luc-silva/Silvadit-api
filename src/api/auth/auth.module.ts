import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from '../user/repository/user.repository';
import { USER_REPOSITORY_TOKEN } from '../user/repository/user.repository.token';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    { provide: USER_REPOSITORY_TOKEN, useClass: UserRepository },
  ],
})
export class AuthModule {}
