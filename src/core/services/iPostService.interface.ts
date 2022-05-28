import { Post } from '../models/post.model';
import { BaseResponseDto } from '../response/baseResponse.dto';

export const IPostService = Symbol('IPostService');

export interface IPostService {
  getPost(id: number): BaseResponseDto;
  getPosts(): BaseResponseDto;
}
