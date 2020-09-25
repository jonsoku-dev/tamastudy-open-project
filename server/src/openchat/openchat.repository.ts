import { EntityRepository, Repository } from 'typeorm/index';
import { Openchat } from './openchat.entity';
import { GetOpenchatListFilterDto } from './dto/getOpenchatListFilter.dto';
import { InternalServerErrorException } from '@nestjs/common';
import { CreateOpenchatRequestDto } from './dto/createOpenchatRequest.dto';
import { EditOpenchatRequestDto } from './dto/editOpenchatRequest.dto';

@EntityRepository(Openchat)
export class OpenchatRepository extends Repository<Openchat> {
  async getOpenchatList(getOpenchatListFilter: GetOpenchatListFilterDto) {
    const query = this.createQueryBuilder();
    if (getOpenchatListFilter) {
      const { category, offset, search, take } = getOpenchatListFilter;
      if (search) {
        query.andWhere('name LIKE :search', { search: `%${search}%` });
      }
      if (category) {
        query.andWhere('category = :category', { category });
      }
      if (take) {
        query.take(take);
      }
      if (offset) {
        query.skip(offset);
      }
    }
    try {
      return await query.orderBy('createdAt', 'DESC').getMany();
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException(e);
    }
  }

  async createOpenchat(createOpenchatRequestDto: CreateOpenchatRequestDto) {
    try {
      return await this.create({
        ...createOpenchatRequestDto,
      }).save();
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException(e);
    }
  }

  async findOpenchat(openchatId: string) {
    try {
      return await this.findOne({
        where: {
          id: openchatId,
        },
      });
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException(e);
    }
  }

  async editOpenchat(
    openchatId: string,
    editOpenchatRequestDto: EditOpenchatRequestDto,
  ): Promise<string> {
    try {
      const query = this.createQueryBuilder();
      const found = await this.findOpenchat(openchatId);
      await query
        .update(Openchat)
        .set({
          ...editOpenchatRequestDto,
        })
        .where('id = :id', { id: found.id })
        .execute();
      return 'success';
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException(e);
    }
  }

  async deleteOpenchat(openchatId: string) {
    try {
      const found = await this.findOpenchat(openchatId);
      await this.delete({ id: found.id });
      return `deleteOpenchat success`;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException(e);
    }
  }
}
