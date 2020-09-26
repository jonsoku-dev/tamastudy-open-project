import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { GourmetCategory } from '../interface/gourmet.interface';

@InputType()
export class CreateGourmetRequestDto {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  desc: string;

  @Field(() => GourmetCategory)
  @IsNotEmpty()
  category: GourmetCategory;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(5)
  score: number;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  lat: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  lng: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  address: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  images: string;
}
