import { EntityRepository, Repository } from 'typeorm/index';
import { GourmetComment } from '../entities/gourmetComment.entity';
import {
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateGourmetCommentRequestDto } from '../dto/createGourmetCommentRequest.dto';
import { Auth } from 'src/auth/entities/auth.entity';
import { EditGourmetCommentRequestDto } from '../dto/editGourmetCommentRequest.dto';
import { Gourmet } from '../entities/gourmet.entity';

@EntityRepository(GourmetComment)
export class GourmetCommentRepository extends Repository<GourmetComment> {
  async createGourmetComment(
    user: Auth,
    gourmetId: string,
    createGourmetCommentRequestDto: CreateGourmetCommentRequestDto,
  ) {
    try {
      return await this.create({
        userId: user.id,
        gourmetId: gourmetId,
        ...createGourmetCommentRequestDto,
      }).save();
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException(e);
    }
  }

  async findGourmetComment(gourmetCommentId: string) {
    return await this.findOne({ where: { id: gourmetCommentId } });
  }

  async editGourmetComment(
    user: Auth,
    gourmetCommentId: string,
    editGourmetCommentRequestDto: EditGourmetCommentRequestDto,
  ) {
    try {
      const foundGourmetComment = await this.findGourmetComment(
        gourmetCommentId,
      );
      if (!foundGourmetComment) {
        throw new NotFoundException();
      }
      if (user.id !== foundGourmetComment.userId) {
        throw new UnauthorizedException();
      }
      const query = this.createQueryBuilder('gourmetComment');
      await query
        .update(GourmetComment)
        .set({
          ...editGourmetCommentRequestDto,
        })
        .where('id = :id', { id: gourmetCommentId })
        .execute();
      return `success to ${gourmetCommentId}`;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException(e);
    }
  }

  async deleteGourmetComment(
    user: Auth,
    gourmetCommentId: string,
  ) {
    try {
      const foundGourmetComment = await this.findGourmetComment(
        gourmetCommentId,
      );
      if (!foundGourmetComment) {
        throw new NotFoundException();
      }
      if (user.id !== foundGourmetComment.userId) {
        throw new UnauthorizedException();
      }
      await this.delete({ id: gourmetCommentId });
      return `success to ${gourmetCommentId}`;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException(e);
    }
  }
}
