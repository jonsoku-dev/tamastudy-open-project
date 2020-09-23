import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Auth } from '../../auth/entities/auth.entity';

@InterfaceType()
export class NoticeInterface {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  desc: string;

  @Field(() => Number)
  view: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Auth)
  user: Auth;
}