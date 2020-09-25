import { Field, Float, InputType, Int } from '@nestjs/graphql';
import {
  IsInt,
  IsLatitude,
  IsLongitude,
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

  @Field(() => Float)
  @IsLatitude()
  @Min(-90)
  @Max(90)
  @IsNotEmpty()
  lat: number;

  @Field(() => Float)
  @IsLongitude()
  @Min(-180)
  @Max(180)
  @IsNotEmpty()
  lng: number;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  address: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  images: string;
}
