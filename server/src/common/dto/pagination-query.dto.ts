import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';
import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class PaginationQueryDto {
  @Field({ nullable: true })
  @Type(() => Number)
  @IsOptional()
  @IsPositive()
  limit?: number;

  @Field({ nullable: true })
  @Type(() => Number)
  @IsOptional()
  @IsPositive()
  offset?: number;
}
