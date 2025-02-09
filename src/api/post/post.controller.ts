import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { PostService } from './post.service';

@Controller("post")
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get(":id")
  async getPosts() {}

  @Delete(":id")
  async deletePost() {}

  @Post("create")
  async createPost() {}

  @Put(":id")
  async updatePost() {}

  @Post("react")
  async reactPost() {}
}
