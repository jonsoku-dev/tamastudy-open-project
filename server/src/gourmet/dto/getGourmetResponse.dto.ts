import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { Auth } from '../../auth/entities/auth.entity';
import { GourmetComment } from '../entities/gourmetComment.entity';
import { GourmetCategory } from '../interface/gourmet.interface';

@ObjectType()
export class GetGourmetResponseDto {
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

  @Field(() => String)
  lat: string;

  @Field(() => String)
  lng: string;

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
