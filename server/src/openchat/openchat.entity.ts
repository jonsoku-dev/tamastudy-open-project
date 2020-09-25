import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm/index';
import {
  OpenchatCategory,
  OpenchatInterface,
} from './interface/openchat.interface';
import { ObjectType } from '@nestjs/graphql';

@ObjectType({ implements: [OpenchatInterface] })
@Entity()
export class Openchat extends BaseEntity implements OpenchatInterface {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  desc: string;

  @Column()
  category: OpenchatCategory;

  @Column()
  participationNumber: string;

  @Column()
  link: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
