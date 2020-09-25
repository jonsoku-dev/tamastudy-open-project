import { InputType, PartialType } from '@nestjs/graphql';
import { CreateGourmetCommentRequestDto } from './createGourmetCommentRequest.dto';

@InputType()
export class EditGourmetCommentRequestDto extends PartialType(
  CreateGourmetCommentRequestDto,
) {}
