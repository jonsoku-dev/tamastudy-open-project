import { EntityRepository, Repository } from 'typeorm/index';
import { News } from './news.entity';
import { GetNewsListResponse } from './response/get-news-list.response';
import { NotFoundException } from '@nestjs/common';
import { NewsFlagFilter } from './filter/news-flag.filter';

@EntityRepository(News)
export class NewsRepository extends Repository<News> {
  async getNewsList(filter: NewsFlagFilter): Promise<GetNewsListResponse[]> {
    try {
      const query = this.createQueryBuilder().select();
      if (filter) {
        if (filter.flag) {
          query.andWhere('flag = :flag', { flag: filter.flag });
        }
      }
      return await query.getMany();
    } catch (e) {
      throw new NotFoundException();
    }
  }
}
