import { Injectable } from '@nestjs/common';
import { PlaceholderResponse } from './response/placeholder.response';
import axios from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { NewsRepository } from './news.repository';
import { GetNewsListResponse } from './response/get-news-list.response';
import { NewsFlagEnum } from './enum/news-flag.enum';
import { NewsFlagFilter } from './filter/news-flag.filter';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(NewsRepository)
    private newsRepository: NewsRepository,
  ) {}

  async getPlaceholder(): Promise<PlaceholderResponse[]> {
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/todos',
      );
      return response.data;
    } catch (e) {
      console.error(e);
    }
  }

  async getNewsList(flag: NewsFlagEnum): Promise<GetNewsListResponse[]> {
    return this.newsRepository.getNewsList(flag);
  }
}
