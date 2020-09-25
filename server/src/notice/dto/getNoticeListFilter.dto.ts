import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

@ArgsType()
export class GetNoticeListFilterDto {
  @Field({ nullable: true })
  @Type(() => String)
  @IsOptional()
  search: string;

  @Field({ nullable: true })
  @Type(() => Number)
  @IsOptional()
  limit: number;

  @Field({ nullable: true })
  @Type(() => Number)
  @IsOptional()
  offset: number;
}
