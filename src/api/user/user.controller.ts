import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { OptionalAuth, Public } from '~/utils/decorators/protect-routes/PublicDecorator';
import { ExtractUser } from '~/utils/decorators/extract-user';
import { UpdateUserDetailsDTO, UpdateUserLocationDTO } from './types/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @OptionalAuth()
  async getUserDetails(@Param('id') id: string) {
    return await this.userService.getUserDetails(id);
  }

  @Get(':id/followers')
  @OptionalAuth()
  async getUserFollowers(@Param('id') id: string) {
    return await this.userService.getUserFollowers(id);
  }

  @Get(':id/following/users')
  @OptionalAuth()
  async getUserFollowedUsers(@Param('id') id: string) {
    return await this.userService.getUserFollowedUsers(id);
  }
  
  @Get(':id/following/forums')
  @OptionalAuth()
  async getUserFollowedForums(@Param('id') id: string) {
    return await this.userService.getUserSubscribedForums(id);
  }

  @Get(':id/feed')
  async getUserPost(@Param('id') id: string) {
    return await this.userService.getUserActivity(id);
  }

  @Put("details")
  async updateUserDetails(@Body() body: UpdateUserDetailsDTO, @ExtractUser() user: ISession) {
    return await this.userService.updateUserDetails(body, user);
  }

  @Put("location")
  async updateUserLocation(@Body() body: UpdateUserLocationDTO, @ExtractUser() user: ISession) {
    return await this.userService.updateUserLocation(body, user);
  }
}
