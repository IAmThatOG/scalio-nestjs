import { Post } from '../models/post.model';

export const IPostRepository = Symbol('IPostRepository');

export interface IPostRepository {
  findById(id: number): Post;
  find(): Post[];
}
