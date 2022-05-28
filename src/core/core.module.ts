import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostRepository } from 'src/infrastructure/repositories/post.repository';
import { IPostRepository } from './repositories/iPostRepository.interface';
import { IPostService } from './services/iPostService.interface';
import { PostService } from './services/implementation/post.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  providers: [
    //services
    { provide: IPostService, useClass: PostService },

    //repositories
    { provide: IPostRepository, useClass: PostRepository },

    PostService,
  ],
  exports: [IPostService],
})
export class CoreModule {}
