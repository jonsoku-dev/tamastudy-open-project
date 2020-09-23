import { InputType, PartialType } from '@nestjs/graphql';
import { createBoardRequestDto } from './create-board-request.dto';

@InputType()
export class editBoardRequestDto extends PartialType(createBoardRequestDto) {}