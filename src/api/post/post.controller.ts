import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostCommentaryDTO } from '../commentary/commentary.dto';
import { CreatePostDTO, ReactPostDTO, UpdatePostDTO } from './post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get(':id')
  async getPosts(@Param('id') id: string) {
    return await this.postService.getPostDetails(id);
  }

  @Delete(':id')
  async deletePost(@Param('id') post_id: string) {
    return await this.postService.deletePost({ post_id });
  }

  @Post('create')
  async createPost(@Body() body: CreatePostDTO) {
    return await this.postService.createPostCommentary(body);
  }

  @Put()
  async updatePost(@Body() body: UpdatePostDTO) {
    return await this.postService.updatePost(body);
  }

  @Post('react')
  async reactPost(body: ReactPostDTO) {
    return await this.postService.reactPost(body);
  }

  @Post()
  async createCommentary(@Body() body: CreatePostCommentaryDTO) {
    return await this.postService.createPostCommentary(body);
  }
}
