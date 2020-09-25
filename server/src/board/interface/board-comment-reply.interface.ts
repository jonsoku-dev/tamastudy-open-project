import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Auth } from '../../auth/entities/auth.entity';
import { Board } from '../entities/board.entity';
import { BoardComment } from '../entities/board-comment.entity';

@InterfaceType()
export class BoardCommentReplyInterface {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  body: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => String)
  userId: string;

  @Field(() => Auth)
  user: Auth;

  @Field(() => String)
  boardCommentId: string;

  @Field(() => BoardComment)
  boardComment: BoardComment;
}
