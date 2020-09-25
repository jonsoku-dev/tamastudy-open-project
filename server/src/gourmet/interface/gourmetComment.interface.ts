import { Field, Float, ID, InterfaceType } from '@nestjs/graphql';
import { Auth } from '../../auth/entities/auth.entity';
import { Gourmet } from '../entities/gourmet.entity';

@InterfaceType()
export abstract class GourmetCommentInterface {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  body: string;

  @Field(() => String, { nullable: true })
  images: string;

  @Field(() => Float)
  score: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Auth)
  user: Auth;

  @Field(() => Gourmet)
  gourmet: Gourmet;
}
