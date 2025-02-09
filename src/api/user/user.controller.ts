import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {} 

  @Get(":id")
  async getUserDetails() {
    return await this.userService.getUserDetails();
  }
}
