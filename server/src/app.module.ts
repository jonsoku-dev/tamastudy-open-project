import {
  CacheModule,
  Module,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
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
import { GraphQLUpload } from 'apollo-server-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ServeHTMLMiddleware } from './app.middleware';
import { OpenchatModule } from './openchat/openchat.module';
import { GourmetModule } from './gourmet/gourmet.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'client'),
    }),
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
        logging: true,
        cli: {
          migrationsDir: 'src/migrations',
        },
      }),
    }),
    GraphQLModule.forRootAsync({
      useFactory: () => ({
        autoSchemaFile: 'schema.gql',
        resolvers: { Upload: GraphQLUpload },
        context: async ({ req, res, connection }) => {
          // subscriptions
          if (connection) {
            return { req: connection.context, res };
          }
          // queries and mutations
          return { req, res };
        },
        cors: {
          credentials: true,
          origin: true,
        },
        uploads: {
          maxFileSize: 10000000, // 10 MB
          maxFiles: 5,
        },
        installSubscriptionHandlers: true,
      }),
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
    OpenchatModule,
    GourmetModule,
  ],
  controllers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ServeHTMLMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.GET });
  }
}
