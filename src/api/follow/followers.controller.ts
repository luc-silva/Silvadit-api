import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { FollowerService } from './followers.service';

@Controller('follower')
export class FollowerController {
  constructor(private readonly userService: FollowerService) {}
}
