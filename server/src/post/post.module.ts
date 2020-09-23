import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostRepository } from './post.repository';
import { PostResolver } from './post.resolver';
import { PostCommentRepository } from './post-comment.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostRepository, PostCommentRepository]),
  ],
  providers: [PostResolver, PostService],
})
export class PostModule {
}
