import { Field, ID, ObjectType } from '@nestjs/graphql';
import { OpenchatCategory } from '../interface/openchat.interface';

@ObjectType()
export class GetOpenchatListResponseDto {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => OpenchatCategory)
  category: OpenchatCategory;

  @Field(() => String)
  participationNumber: string;

  @Field(() => String)
  link: string;

  @Field(() => Date)
  createdAt: Date;
}