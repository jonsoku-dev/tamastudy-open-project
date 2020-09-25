import { Field, ID, InterfaceType, registerEnumType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InterfaceType()
export abstract class OpenchatInterface {
  @Field(() => ID)
  id: string;

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

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

export enum OpenchatCategory {
  IT = 'IT',
  STUDY = 'STUDY',
  INFO = 'INFO',
}

registerEnumType(OpenchatCategory, {
  name: 'OpenchatCategory', // this one is mandatory
});
