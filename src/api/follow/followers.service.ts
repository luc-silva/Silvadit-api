import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../user/repository/user.repository';
import { FollowerRepository } from './repository/followers.repository';
import { UserRepositoryBase } from '../user/repository/user.repository.base';
import { FollowerRepositoryBase } from './repository/followers.repository.base';

@Injectable()
export class FollowerService {
  constructor(
    @Inject(UserRepository) private userRepository: UserRepositoryBase,
    @Inject(FollowerRepository) private followerRepository: FollowerRepositoryBase,
  ) {}
}
