import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardRepository } from './repositories/board.repository';
import { BoardResolver } from './board.resolver';
import { BoardCommentRepository } from './repositories/board-comment.repository';
import { BoardLikeRepository } from './repositories/board-like.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BoardRepository, BoardCommentRepository, BoardLikeRepository])],
  providers: [BoardResolver, BoardService],
})
export class BoardModule {
}
