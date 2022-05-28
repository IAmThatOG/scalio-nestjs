import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Post } from 'src/core/models/post.model';
import { IPostRepository } from 'src/core/repositories/iPostRepository.interface';
import { BaseResponseDto } from 'src/core/response/baseResponse.dto';
import {
  PostResponse,
  PostsResponse,
} from 'src/core/response/postResponse.dto';
import { ServiceResponseDto } from 'src/core/response/serviceResponse.dto';
import { ResponseCode } from 'src/core/utils/responseCode.util';
import { IPostService } from '../iPostService.interface';

@Injectable()
export class PostService implements IPostService {
  constructor(
    @Inject(IPostRepository) private readonly postRepo: IPostRepository,
  ) {}

  getPost(id: number): BaseResponseDto {
    const post = this.postRepo.findById(id);
    if (!post) {
      throw new NotFoundException({ code: ResponseCode.PostNotFound });
    }
    if (!post.title || !post.body) {
      throw new BadRequestException({ code: ResponseCode.InvalidPost });
    }
    return <ServiceResponseDto<PostResponse>>{
      status: true,
      statusCode: HttpStatus.OK,
      payload: { post },
    };
  }

  getPosts(): BaseResponseDto {
    const posts = this.postRepo.find();
    return <ServiceResponseDto<PostsResponse>>{
      status: true,
      statusCode: HttpStatus.OK,
      payload: { posts },
    };
  }
}
