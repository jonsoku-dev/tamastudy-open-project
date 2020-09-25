import { InputType, PartialType } from '@nestjs/graphql';
import { CreateBoardRequestDto } from './createBoardRequest.dto';

@InputType()
export class EditBoardRequestDto extends PartialType(CreateBoardRequestDto) {}