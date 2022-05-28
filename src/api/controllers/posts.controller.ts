import {
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Render,
  Res,
} from '@nestjs/common';
import { IPostService } from 'src/core/services/iPostService.interface';
import { Response } from 'express';

@Controller('posts')
export class PostsController {
  constructor(
    @Inject(IPostService) private readonly postService: IPostService,
  ) {}

  @Get(':id')
  @Render('post')
  getPost(@Param('id', ParseIntPipe) id: number) {
    const result = this.postService.getPost(id);
    return result;
  }

  @Get()
  getPosts() {
    return this.postService.getPosts();
  }
}
