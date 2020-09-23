import { Args, Query, Resolver } from '@nestjs/graphql';
import { NewsService } from './news.service';
import { PlaceholderResponse } from './response/placeholder.response';
import { GetNewsListResponse } from './response/get-news-list.response';
import { NewsFlagEnum } from './enum/news-flag.enum';
import { NewsFlagFilter } from './filter/news-flag.filter';

@Resolver()
export class NewsResolver {
  constructor(private newsService: NewsService) {}

  @Query(() => [PlaceholderResponse])
  getPlaceholder(): Promise<PlaceholderResponse[]> {
    return this.newsService.getPlaceholder();
  }

  @Query(() => [GetNewsListResponse])
  getNewsList(
    @Args('filter', { nullable: true }) filter: NewsFlagFilter,
  ): Promise<GetNewsListResponse[]> {
    return this.newsService.getNewsList(filter);
  }
}
