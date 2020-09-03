import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from '../src/Entity/Book';
import { Author } from '../src/Entity/Author';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          synchronize: true,
          database: './db/test_e2e.sqlite',
          entities: [Book, Author]
        })
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/author (GET)', () => {
    return request(app.getHttpServer())
      .get('/author')
      .expect(200)
      .expect('Hello World!');
  });
});
