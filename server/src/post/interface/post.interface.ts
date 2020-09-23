import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Auth } from '../../auth/entities/auth.entity';
import { PostComment } from '../post-comment.entity';

@InterfaceType()
export class PostInterface {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  content: string;

  @Field(() => Date)
  createdAt: string;

  @Field(() => Date)
  updatedAt: string;

  @Field(() => Auth)
  user: Promise<Auth>;

  @Field(() => [PostComment])
  comments: Promise<PostComment[]>;
}