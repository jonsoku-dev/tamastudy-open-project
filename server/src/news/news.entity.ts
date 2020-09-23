import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm/index';
import { ObjectType } from '@nestjs/graphql';
import { NewsInterface } from './interface/news.interface';
import { NewsFlagEnum } from './enum/news-flag.enum';

@ObjectType({
  implements: [NewsInterface],
})
@Entity()
export class News extends BaseEntity implements NewsInterface {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  title: string;
  @Column({ nullable: true })
  content: string;
  @Column({ nullable: true })
  press: string;
  @Column({ nullable: true })
  data: Date;
  @Column({ nullable: true })
  url: string;
  @Column({ nullable: true })
  portal: string;
  @Column({ name: 'created_at', nullable: true })
  createAt: Date;
  @Column({ name: 'updated_at', nullable: true })
  updatedAt: Date;
  @Column({ nullable: true })
  flag: NewsFlagEnum;
}
