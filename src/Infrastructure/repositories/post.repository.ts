import { readFileSync } from 'fs';
import { join } from 'path';
import { Post } from 'src/core/models/post.model';
import { IPostRepository } from 'src/core/repositories/iPostRepository.interface';

export class PostRepository implements IPostRepository {
  static posts: Post[] = [];
  constructor() {
    // load the json data from file
    if (PostRepository.posts.length === 0) {
      const filePath = join(
        process.cwd(),
        'src',
        'infrastructure',
        'repositories',
        'posts.json',
      );
      try {
        const fileContent = readFileSync(filePath, 'utf-8');
        PostRepository.posts = JSON.parse(fileContent);
      } catch (error) {
        throw error;
      }
    }
  }

  findById(id: number): Post {
    const post = PostRepository.posts.find((x) => x.id === id);
    return post;
  }

  find(): Post[] {
    return PostRepository.posts;
  }
}
