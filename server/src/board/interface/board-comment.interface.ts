import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Auth } from '../../auth/entities/auth.entity';
import { Board } from '../entities/board.entity';
import { BoardCommentReply } from '../entities/board-comment-reply.entity';

@InterfaceType()
export class BoardCommentInterface {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  body: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Auth)
  user: Auth;

  @Field(() => Board)
  board: Board;

  @Field(() => [BoardCommentReply])
  boardCommentReplies: BoardCommentReply[];
}
