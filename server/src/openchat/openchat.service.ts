import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OpenchatRepository } from './openchat.repository';
import { GetOpenchatListFilterDto } from './dto/getOpenchatListFilter.dto';
import { CreateOpenchatRequestDto } from './dto/createOpenchatRequest.dto';
import { EditOpenchatRequestDto } from './dto/editOpenchatRequest.dto';

@Injectable()
export class OpenchatService {
  constructor(
    @InjectRepository(OpenchatRepository)
    private readonly openchatRepository: OpenchatRepository,
  ) {}

  getOpenchatList(getOpenchatListFilter: GetOpenchatListFilterDto) {
    return this.openchatRepository.getOpenchatList(getOpenchatListFilter);
  }

  createOpenchat(createOpenchatRequestDto: CreateOpenchatRequestDto) {
    return this.openchatRepository.createOpenchat(createOpenchatRequestDto);
  }

  editOpenchat(
    openchatId: string,
    editOpenchatRequestDto: EditOpenchatRequestDto,
  ) {
    return this.openchatRepository.editOpenchat(
      openchatId,
      editOpenchatRequestDto,
    );
  }

  deleteOpenchat(openchatId: string) {
    return this.openchatRepository.deleteOpenchat(openchatId);
  }
}
