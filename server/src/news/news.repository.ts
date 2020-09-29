import { EntityRepository, Repository } from 'typeorm/index';
import { News } from './news.entity';
import { GetNewsListResponse } from './response/get-news-list.response';
import { NotFoundException } from '@nestjs/common';
import { NewsFlagEnum } from './enum/news-flag.enum';

@EntityRepository(News)
export class NewsRepository extends Repository<News> {
  async getNewsList(flag: NewsFlagEnum): Promise<GetNewsListResponse[]> {
    try {
      const query = this.createQueryBuilder().select();
      if (flag) {
        query.andWhere('flag = :flag', { flag });
      }
      return await query.getMany();
    } catch (e) {
      throw new NotFoundException();
    }
  }
}
