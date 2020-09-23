import { InputType, PartialType } from '@nestjs/graphql';
import { CreateNoticeRequestDto } from './createNoticeRequest.dto';

@InputType()
export class EditNoticeRequestDto extends PartialType(CreateNoticeRequestDto) {}
