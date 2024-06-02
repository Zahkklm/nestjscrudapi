import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/user/register (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/user/register')
      .send({ username: 'testuser', email: 'test@example.com' })
      .expect(201);

    expect(response.body.username).toEqual('testuser');
    expect(response.body.email).toEqual('test@example.com');
  });

  it('/user/verify-email/:username/:verificationToken', async () => {
    await request(app.getHttpServer())
      .get('/user/verify-email/testuser/testtoken+%79123&-@')
      .expect(404);
  });

  it('/user/check-verification/:username (GET)', async () => {
    await request(app.getHttpServer())
      .get('/user/check-verification/testuser')
      .expect(404);
  });

  afterAll(async () => {
    await app.close();
  });
});
