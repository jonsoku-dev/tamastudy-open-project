import { InputType, PartialType } from '@nestjs/graphql';
import { CreateOpenchatRequestDto } from './createOpenchatRequest.dto';

@InputType()
export class EditOpenchatRequestDto extends PartialType(
  CreateOpenchatRequestDto,
) {}
