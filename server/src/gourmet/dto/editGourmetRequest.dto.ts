import { InputType, PartialType } from '@nestjs/graphql';
import { CreateGourmetRequestDto } from './createGourmetRequest.dto';

@InputType()
export class EditGourmetRequestDto extends PartialType(
  CreateGourmetRequestDto,
) {}
