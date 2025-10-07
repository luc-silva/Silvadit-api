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
import { CreatePostCommentaryDTO } from '../commentary/types/commentary.dto';
import { ReactPostDTO, UpdatePostDTO } from './types/post.dto';
import { ExtractUser } from '~/utils/decorators/extract-user';
import { Public } from '~/utils/decorators/protect-routes';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get(':id')
  @Public()
  async getPostDetails(@Param('id') id: string) {
    return await this.postService.getPostDetails(id);
  }

  @Delete(':id')
  async deletePost(
    @Param('id') post_id: string,
    @ExtractUser() session: ISession,
  ) {
    return await this.postService.deletePost(post_id, session);
  }

  @Put()
  async updatePost(
    @Body() body: UpdatePostDTO,
    @ExtractUser() session: ISession,
  ) {
    return await this.postService.updatePost(body, session);
  }

  @Post('react')
  async reactPost(body: ReactPostDTO) {
    return await this.postService.reactPost(body);
  }

  @Post('commentary')
  async createCommentary(
    @Body() body: CreatePostCommentaryDTO,
    @ExtractUser() session: ISession,
  ) {
    return await this.postService.createPostCommentary(body, session);
  }

  @Get(':id/commentaries')
  @Public()
  async getCommentaries(@Param('id') post_id: string) {
    return await this.postService.getPostComentaries(post_id);
  }
}
