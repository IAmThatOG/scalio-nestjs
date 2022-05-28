import { Post } from '../models/post.model';

export interface PostResponse {
  post: Post;
}

export interface PostsResponse {
  posts: Post[];
}
