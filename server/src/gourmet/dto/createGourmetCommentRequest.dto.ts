import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

@InputType()
export class CreateGourmetCommentRequestDto {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  body: string;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(5)
  score: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  images: string;
}
