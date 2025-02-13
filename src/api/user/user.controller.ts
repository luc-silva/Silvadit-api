import { Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {} 

  @Get(":id")
  async getUserDetails(@Param('id') id: string) {
    return await this.userService.getUserDetails();
  }

  @Get(":id/followers")
  async getUserFollowers(@Param('id') id: string) {
    return await this.userService.getUserFollowers();
  }

  @Get(":id/following")
  async getUserFollowing(@Param('id') id: string) {
    return await this.userService.getUserFollowing();
  }
}
