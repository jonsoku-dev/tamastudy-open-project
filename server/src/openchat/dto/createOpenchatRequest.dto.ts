import { Field, InputType } from '@nestjs/graphql';
import { OpenchatCategory } from '../interface/openchat.interface';
import { MaxLength } from 'class-validator';

@InputType()
export class CreateOpenchatRequestDto {
  @Field(() => String)
  name: string;

  @Field(() => String)
  desc: string;

  @Field(() => OpenchatCategory)
  category: OpenchatCategory;

  @Field(() => String)
  @MaxLength(4)
  participationNumber: string;

  @Field(() => String)
  link: string;
}
