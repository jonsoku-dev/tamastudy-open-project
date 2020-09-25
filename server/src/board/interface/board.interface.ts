import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { BoardCategory } from '../enum/board-category.enum';
import { Auth } from '../../auth/entities/auth.entity';
import { BoardComment } from '../entities/board-comment.entity';
import { BoardLike } from '../entities/board-like.entity';

@InterfaceType()
export abstract class BoardInterface {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  desc: string;

  @Field(() => Number)
  view: number;

  @Field(() => BoardCategory)
  category: BoardCategory;

  @Field(() => String)
  filepath: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Auth)
  user: Auth;

  @Field(() => [BoardComment])
  comments: BoardComment[];

  @Field(() => [BoardLike])
  likes: BoardLike[];

  @Field(() => Number, {defaultValue: 0})
  likesCount?: number;
}
