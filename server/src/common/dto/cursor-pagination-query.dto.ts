import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';
import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CursorPaginationQueryDto {
  @Field({ nullable: true })
  @Type(() => Number)
  @IsOptional()
  @IsPositive()
  after?: number;

  @Field({ nullable: true })
  @Type(() => Number)
  @IsOptional()
  @IsPositive()
  first?: number;
}