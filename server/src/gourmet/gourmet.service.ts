import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GourmetRepository } from './repositories/gourmet.repository';
import { GourmetCommentRepository } from './repositories/gourmetComment.repository';
import { GetGourmetListResponseDto } from './dto/getGourmetListResponse.dto';
import { Auth } from '../auth/entities/auth.entity';
import { CreateGourmetRequestDto } from './dto/createGourmetRequest.dto';
import { Gourmet } from './entities/gourmet.entity';
import { GetGourmetResponseDto } from './dto/getGourmetResponse.dto';
import { EditGourmetRequestDto } from './dto/editGourmetRequest.dto';
import { CreateGourmetCommentRequestDto } from './dto/createGourmetCommentRequest.dto';
import { GetGourmetListFilterDto } from './dto/getGourmetListFilter.dto';
import { EditGourmetCommentRequestDto } from './dto/editGourmetCommentRequest.dto';
import { GourmetComment } from './entities/gourmetComment.entity';

@Injectable()
export class GourmetService {
  constructor(
    @InjectRepository(GourmetRepository)
    private readonly gourmetRepository: GourmetRepository,
    @InjectRepository(GourmetCommentRepository)
    private readonly gourmetCommentRepository: GourmetCommentRepository,
  ) {}

  getGourmetList(
    getGourmetListFilterDto: GetGourmetListFilterDto,
  ): Promise<GetGourmetListResponseDto[]> {
    return this.gourmetRepository.getGourmetList(getGourmetListFilterDto);
  }

  getGourmet(gourmetId: string): Promise<GetGourmetResponseDto> {
    return this.gourmetRepository.getGourmet(gourmetId);
  }

  createGourmet(
    user: Auth,
    createGourmetRequestDto: CreateGourmetRequestDto,
  ): Promise<Gourmet> {
    return this.gourmetRepository.createGourmet(user, createGourmetRequestDto);
  }

  editGourmet(
    user: Auth,
    gourmetId: string,
    editGourmetRequestDto: EditGourmetRequestDto,
  ): Promise<string> {
    return this.gourmetRepository.editGourmet(
      user,
      gourmetId,
      editGourmetRequestDto,
    );
  }

  deleteGourmet(user: Auth, gourmetId: string): Promise<string> {
    return this.gourmetRepository.deleteGourmet(user, gourmetId);
  }

  createGourmetComment(
    user: Auth,
    gourmetId: string,
    createGourmetCommentRequestDto: CreateGourmetCommentRequestDto,
  ) {
    const foundGourmet = this.getGourmet(gourmetId);
    if (!foundGourmet) {
      throw new NotFoundException();
    }
    return this.gourmetCommentRepository.createGourmetComment(
      user,
      gourmetId,
      createGourmetCommentRequestDto,
    );
  }

  async editGourmetComment(
    user: Auth,
    gourmetCommentId: string,
    editGourmetCommentRequestDto: EditGourmetCommentRequestDto,
  ) {
    return this.gourmetCommentRepository.editGourmetComment(
      user,
      gourmetCommentId,
      editGourmetCommentRequestDto,
    );
  }

  async deleteGourmetComment(user: Auth, gourmetCommentId: string) {
    return this.gourmetCommentRepository.deleteGourmetComment(
      user,
      gourmetCommentId,
    );
  }
}
