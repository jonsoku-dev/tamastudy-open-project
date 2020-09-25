import { EntityRepository, Repository } from 'typeorm/index';
import { Gourmet } from '../entities/gourmet.entity';
import {
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { GetGourmetListResponseDto } from '../dto/getGourmetListResponse.dto';
import { GetGourmetResponseDto } from '../dto/getGourmetResponse.dto';
import { CreateGourmetRequestDto } from '../dto/createGourmetRequest.dto';
import { Auth } from '../../auth/entities/auth.entity';
import { EditGourmetRequestDto } from '../dto/editGourmetRequest.dto';
import { GetGourmetListFilterDto } from '../dto/getGourmetListFilter.dto';

@EntityRepository(Gourmet)
export class GourmetRepository extends Repository<Gourmet> {
  async getGourmetList(
    getGourmetListFilterDto: GetGourmetListFilterDto,
  ): Promise<GetGourmetListResponseDto[]> {
    try {
      const query = this.createQueryBuilder('gourmet');
      if (getGourmetListFilterDto) {
        const {
          category,
          score,
          limit,
          offset,
          search,
          lat,
          lng,
        } = getGourmetListFilterDto;
        if (category) {
          query.andWhere('gourmet.category = :category', { category });
        }
        if (score) {
          query.andWhere('gourmet.score >= :score', { score });
        }
        if (limit) {
          query.take(limit);
        }
        if (offset) {
          query.skip(offset);
        }
        if (search) {
          query.andWhere('gourmet.name LIKE :search', {
            search: `%${search}%`,
          });
          query.orWhere('gourmet.address LIKE :search', {
            search: `%${search}%`,
          });
        }
        if (lat && lng) {
          query
            .addSelect(
              `( 6371 * acos( cos( radians(${lat}) ) * cos( radians( gourmet.lat ) ) * cos( radians( gourmet.lng ) - radians(${lng}) ) + sin( radians(${lat}) ) * sin( radians( lat ) ) ) )`,
              'distance',
            )
            .having('distance < 3')
            .orderBy('distance', 'DESC')
        }
      }
      const result = await query
        .leftJoinAndSelect('gourmet.user', 'user')
        .leftJoinAndSelect('gourmet.comments', 'comments')
        .leftJoinAndSelect('comments.user', 'commentUser')
        .getMany();
      return result;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException(e);
    }
  }

  async findGourmet(gourmetId: string): Promise<Gourmet> {
    return await this.findOne({
      where: {
        id: gourmetId,
      },
    });
  }

  async getGourmet(gourmetId: string): Promise<GetGourmetResponseDto> {
    try {
      const found = await this.findGourmet(gourmetId);
      if (!found) {
        throw new NotFoundException(`not found id: ${gourmetId}`);
      }
      const query = this.createQueryBuilder('gourmet');
      return await query
        .leftJoinAndSelect('gourmet.user', 'user')
        .leftJoinAndSelect('gourmet.comments', 'comments')
        .leftJoinAndSelect('comments.user', 'commentUser')
        .where('gourmet.id = :gourmetId', { gourmetId })
        .getOne();
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException(e);
    }
  }

  async createGourmet(
    user: Auth,
    createGourmetRequestDto: CreateGourmetRequestDto,
  ): Promise<Gourmet> {
    try {
      return await this.create({
        userId: user.id,
        ...createGourmetRequestDto,
      }).save();
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException(e);
    }
  }

  async editGourmet(
    user: Auth,
    gourmetId: string,
    editGourmetRequestDto: EditGourmetRequestDto,
  ): Promise<string> {
    try {
      const query = this.createQueryBuilder();
      const found = await this.findGourmet(gourmetId);
      if (!found) {
        throw new NotFoundException(`not found id: ${gourmetId}`);
      }
      if (found.userId !== user.id) {
        throw new UnauthorizedException();
      }
      await query
        .update(Gourmet)
        .set({
          ...editGourmetRequestDto,
        })
        .where('id = :id', { id: found.id })
        .execute();
      return `success to ${gourmetId}`;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException(e);
    }
  }

  async deleteGourmet(user: Auth, gourmetId: string): Promise<string> {
    try {
      const found = await this.findGourmet(gourmetId);
      if (!found) {
        throw new NotFoundException(`not found id: ${gourmetId}`);
      }
      if (found.userId !== user.id) {
        throw new UnauthorizedException();
      }
      await this.delete({ id: gourmetId });
      return `success to ${gourmetId}`;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException(e);
    }
  }
}
