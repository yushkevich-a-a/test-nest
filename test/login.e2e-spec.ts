import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { AuthDto } from './../src/auth/dto/auth.dto';
import { disconnect } from 'mongoose';
import { WRONG_PASSWORD_ERROR } from './../src/auth/auth.constants';
import { USER_NOT_FOUND_ERROR } from './../src/user/user.constants';

const loginDto: AuthDto = {
  login: 'qwq@test.ru',
  password: 'qwerty',
};

describe('AuthController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('auth/login (POST) - success', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto)
      .expect(200)
      .then(({ body }: request.Response) => {
        const access_token = body.access_token;
        expect(access_token).toBeDefined();
      });
  });

  it('auth/login (POST) - fail password', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ ...loginDto, password: 'notright' })
      .expect(401)
      .then(({ body }: request.Response) => {
        expect(body.message).toBe(WRONG_PASSWORD_ERROR);
      });
  });

  it('auth/login (POST) - fail login', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ ...loginDto, login: 'notright' })
      .expect(401)
      .then(({ body }: request.Response) => {
        expect(body.message).toBe(USER_NOT_FOUND_ERROR);
      });
  });

  afterAll(() => {
    disconnect();
  });
});
