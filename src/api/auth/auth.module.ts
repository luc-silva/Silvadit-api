import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from '../user/user.repository';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, UserRepository],
})
export class AuthModule {}
