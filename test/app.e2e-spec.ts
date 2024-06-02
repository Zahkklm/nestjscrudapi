import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

function parseJson(str) {
  const data = JSON.parse(str); 
  return data.map(({body}) => body).join('');
}

describe('Users Controller END TO END TEST', () => {
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
      .send({ username: 'userthatexists', email: 'test@example.com', password: "testpassword" })
      
      if(response.body){ // this has to be checked to make sure POST request is awaited and not undefined
        let res = JSON.stringify(response.body);
        expect(res).toContain("success"); // status: success situation
      }
  });

  it('/user/verify-email/:username/:verificationToken (GET)', async () => {
    await request(app.getHttpServer())
      .get('/user/verify-email/userhtatdoesnotexist/testtoken+%79123&-@')
      .expect(404); // username not found situation
  });

  it('/user/verify-email/:username/:verificationToken (GET)', async () => {
    await request(app.getHttpServer())
      .get('/user/verify-email/userhtatexists/falsetoken')
      .expect(404); // bad request 400
  });

  it('/user/check-verification/:username (GET)', async () => {
    let response = await request(app.getHttpServer())
      .get('/user/check-verification/userthatexists');

      if(response.body){ // this has to be checked to make sure GET request is awaited and not undefined
        let res = JSON.stringify(response.body);
        expect(res).toContain("success"); // status: success situation
      }
  });

  it('/user/check-verification/:username (GET)', async () => {
    await request(app.getHttpServer())
      .get('/user/check-verification/userthatdoesnotexist').expect(404); // username not found 404 situation
  });

  afterAll(async () => {
    await app.close();
  });
});
