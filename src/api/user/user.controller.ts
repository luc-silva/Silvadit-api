import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDTO } from '../auth/types/auth.dto';
import { Public } from '~/utils/decorators/protect-routes';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @Public()
  async getUserDetails(@Param('id') id: string) {
    return await this.userService.getUserDetails(id);
  }

  @Get(':id/followers')
  @Public()
  async getUserFollowers(@Param('id') id: string) {
    return await this.userService.getUserFollowers(id);
  }

  @Get(':id/following/users')
  @Public()
  async getUserFollowedUsers(@Param('id') id: string) {
    return await this.userService.getUserFollowedUsers(id);
  }

  @Get(':id/following/forums')
  @Public()
  async getUserFollowedForums(@Param('id') id: string) {
    return await this.userService.getUserSubscribedForums(id);
  }

  @Get(':id/feed')
  async getUserPost(@Param('id') id: string) {
    return await this.userService.getUserActivity(id);
  }

  @Put()
  @Public()
  async update(@Body() body: UpdateUserDTO) {
    return await this.userService.updateUserDetails(body);
  }
}
