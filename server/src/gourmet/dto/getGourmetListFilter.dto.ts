import { ArgsType, Field, Float } from '@nestjs/graphql';
import { IsInt, IsLatitude, IsLongitude, IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator';
import { GourmetCategory } from '../interface/gourmet.interface';

@ArgsType()
export class GetGourmetListFilterDto {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  search: string;

  @Field(() => GourmetCategory, { nullable: true })
  @IsOptional()
  @IsString()
  category: GourmetCategory;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  @IsInt()
  limit: number;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  @IsInt()
  offset: number;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(5)
  score: number;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  lat: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  lng: string;
}