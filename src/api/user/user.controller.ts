import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { OptionalAuth } from '~/utils/decorators/protect-routes/PublicDecorator';
import { ExtractUser } from '~/utils/decorators/extract-user';
import { UpdateUserDetailsDTO, UpdateUserLocationDTO } from './types/user.dto';
import { buildResource } from '~/utils/resource/builder';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @OptionalAuth()
  async getUserDetails(@Param('id') id: string) {
    const data = await this.userService.getUserDetails(id);
    return buildResource(data)
      .setMessage('User details retrieved successfully')
      .addLink('self', `/user/${id}`, 'GET')
      .addLink('followers', `/user/${id}/followers`, 'GET')
      .addLink('following', `/user/${id}/following/users`, 'GET')
      .addLink('feed', `/user/${id}/feed`, 'GET')
      .build();
  }

  @Get(':id/followers')
  @OptionalAuth()
  async getUserFollowers(@Param('id') id: string) {
    const data = await this.userService.getUserFollowers(id);
    return buildResource(data)
      .setMessage('User followers retrieved successfully')
      .addLink('self', `/user/${id}/followers`, 'GET')
      .addLink('user', `/user/${id}`, 'GET')
      .build();
  }

  @Get(':id/following/users')
  @OptionalAuth()
  async getUserFollowedUsers(@Param('id') id: string) {
    const data = await this.userService.getUserFollowedUsers(id);
    return buildResource(data)
      .setMessage('User followed users retrieved successfully')
      .addLink('self', `/user/${id}/following/users`, 'GET')
      .addLink('user', `/user/${id}`, 'GET')
      .build();
  }

  @Get(':id/following/forums')
  @OptionalAuth()
  async getUserFollowedForums(@Param('id') id: string) {
    const data = await this.userService.getUserSubscribedForums(id);
    return buildResource(data)
      .setMessage('User subscribed forums retrieved successfully')
      .addLink('self', `/user/${id}/following/forums`, 'GET')
      .addLink('user', `/user/${id}`, 'GET')
      .build();
  }

  @Get(':id/feed')
  @OptionalAuth()
  async getUserPost(@Param('id') id: string) {
    const data = await this.userService.getUserActivity(id);
    return buildResource(data)
      .setMessage('User activity feed retrieved successfully')
      .addLink('self', `/user/${id}/feed`, 'GET')
      .addLink('user', `/user/${id}`, 'GET')
      .build();
  }

  @Put('details')
  @OptionalAuth()
  async updateUserDetails(
    @Body() body: UpdateUserDetailsDTO,
    @ExtractUser() user: ISession,
  ) {
    const data = await this.userService.updateUserDetails(body, user);
    return buildResource(data)
      .setMessage('User details updated successfully')
      .addLink('self', `/user/${user.id}`, 'GET')
      .addLink('update', `/user/details`, 'PUT')
      .build();
  }

  @Put('location')
  @OptionalAuth()
  async updateUserLocation(
    @Body() body: UpdateUserLocationDTO,
    @ExtractUser() user: ISession,
  ) {
    const data = await this.userService.updateUserLocation(body, user);
    return buildResource(data)
      .setMessage('User location updated successfully')
      .addLink('self', `/user/${user.id}`, 'GET')
      .addLink('update', `/user/location`, 'PUT')
      .build();
  }
}
