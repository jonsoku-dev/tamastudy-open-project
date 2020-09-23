import { Field, ObjectType } from '@nestjs/graphql';
import { Auth } from '../../auth/entities/auth.entity';

@ObjectType()
export class GetNoticeResponseDto {
  @Field(() => String)
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