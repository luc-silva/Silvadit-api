import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { PostRepository } from '../post/post.repository';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, UserRepository, PostRepository],
  exports: [UserRepository],
})
export class UserModule {}
