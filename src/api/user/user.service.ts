import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}
  async getUserStatistics() {}

  async getUserFollowers() {}

  async getUserDetails() {}

  async login() {}

  async updateUserDetails() {}

  async inactivateUser() {}

  async banUser() {}

  async getUserComentaries() {}
}
