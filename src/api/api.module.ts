import { Module } from '@nestjs/common';
import { CoreModule } from 'src/core/core.module';
import { PostsController } from './controllers/posts.controller';
import { HomeController } from './controllers/home.controller';

@Module({
  controllers: [PostsController, HomeController],
  imports: [CoreModule],
})
export class ClientModule {}
