import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { strict as assert } from 'assert';

describe('AuthorController (e2e)', () => {
  let app: INestApplication;
  const route = 'author'

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/author (GET)', () => {
    return request(app.getHttpServer())
      .get(`/${route}`)
      .expect(200)
      .expect([]);
  });

  it('(POST) Should create a new author', () => {
    return request(app.getHttpServer())
      .post(`/${route}`)
      .send({
        first_name: 'John',
        last_name: 'Doe'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .then(response => {
        assert.deepStrictEqual(response.body.first_name, 'John')
        assert.deepStrictEqual(response.body.last_name, 'Doe')
      })
      .catch(err => {
        throw err
      })
  })
});
