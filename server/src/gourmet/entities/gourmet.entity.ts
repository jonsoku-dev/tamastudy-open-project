import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm/index';
import { ObjectType } from '@nestjs/graphql';
import {
  GourmetCategory,
  GourmetInterface,
} from '../interface/gourmet.interface';
import { Auth } from '../../auth/entities/auth.entity';
import { GourmetComment } from './gourmetComment.entity';

@ObjectType({
  implements: [GourmetInterface],
})
@Entity()
export class Gourmet extends BaseEntity implements GourmetInterface {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  desc: string;

  @Column()
  category: GourmetCategory;

  @Column()
  score: number;

  @Column()
  lat: number;

  @Column()
  lng: number;

  @Column()
  address: string;

  @Column({ nullable: true })
  images: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  userId: string;
  @ManyToOne(() => Auth, (user) => user.gourmets)
  @JoinColumn({ name: 'userId' })
  user: Auth;

  @OneToMany(() => GourmetComment, (comment) => comment.gourmet)
  comments: GourmetComment[];
}
