import { ArgsType, Field } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { OpenchatCategory } from '../interface/openchat.interface';

@ArgsType()
export class GetOpenchatListFilterDto {
  @Field(() => OpenchatCategory, { nullable: true })
  @IsString()
  @IsOptional()
  category: OpenchatCategory;

  @Field(() => Number, { nullable: true })
  @IsNumber()
  @IsOptional()
  take: number;

  @Field(() => Number, { nullable: true })
  @IsNumber()
  @IsOptional()
  offset: number;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  search: string;
}
