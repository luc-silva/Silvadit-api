import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { PostRepository } from '../post/post.repository';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private postRepository: PostRepository,
  ) {}
  async getUserFollowers() {
    return await this.userRepository.getUserFollowers(`das`);
  }

  async getUserFollowing() {
    return await this.userRepository.getUserFollowing();
  }

  async getUserDetails() {
    return await this.userRepository.getUserDetails();
  }

  async updateUserDetails() {}

  async inactivateUser() {}

  async banUser() {}

  async getUserComentaries() {}

  async getUserPosts() {}

  async getUserLoginData() {}

  async createUser() {}

  async getUserSubscribedForums(id: string) {}

  async getUserSavedForums(id: string) {}
}
