import { CacheModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import * as redisStore from 'cache-manager-redis-store';
import { TypeOrmCoreModule } from '@nestjs/typeorm/dist/typeorm-core.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { NoticeModule } from './notice/notice.module';
import { BoardModule } from './board/board.module';
import { NewsModule } from './news/news.module';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env',
      validationSchema: Joi.object({
        MYSQL_HOST: Joi.required(),
        MYSQL_PORT: Joi.number().default(3307),
        REDIS_HOST: Joi.required(),
        REDIS_PORT: Joi.number().default(6380),
      }),
    }),
    CommonModule,
    TypeOrmCoreModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.MYSQL_HOST,
        port: +process.env.MYSQL_PORT,
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        autoLoadEntities: true,
        synchronize: true,
        cli: {
          migrationsDir: 'src/migrations',
        },
      }),
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context: ({ req, res }) => ({ req, res }),
      cors: {
        credentials: true,
        origin: true,
      },
    }),
    CacheModule.register({
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: +process.env.REDIS_PORT,
    }),
    AuthModule,
    PostModule,
    NoticeModule,
    BoardModule,
    NewsModule,
  ],
  controllers: [],
})
export class AppModule {}
