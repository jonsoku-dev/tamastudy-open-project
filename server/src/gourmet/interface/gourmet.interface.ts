import {
  Field,
  Float,
  ID,
  InterfaceType,
  registerEnumType,
} from '@nestjs/graphql';
import { Auth } from '../../auth/entities/auth.entity';
import { GourmetComment } from '../entities/gourmetComment.entity';

@InterfaceType()
export abstract class GourmetInterface {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  desc: string;

  @Field(() => GourmetCategory)
  category: GourmetCategory;

  @Field(() => Float)
  score: number;

  @Field(() => Float)
  lat: number;

  @Field(() => Float)
  lng: number;

  @Field(() => String)
  address: string;

  @Field(() => String, { nullable: true })
  images: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Auth)
  user: Auth;

  @Field(() => [GourmetComment])
  comments: GourmetComment[];
}

export enum GourmetCategory {
  NOODLE = 'NOODLE',
  RICE = 'RICE',
  BREAD = 'BREAD',
  MEAT = 'MEAT',
}

registerEnumType(GourmetCategory, {
  name: 'GourmetCategory', // this one is mandatory
});
