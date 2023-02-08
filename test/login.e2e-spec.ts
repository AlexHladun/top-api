import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AuthDto } from '../src/auth/dto/auth.dto';
import { USER_NOT_FOUND, WRONG_PASSWORD } from '../src/auth/auth.constants';


const testLoginDto: AuthDto = {
    login: 'Marcus@email.com',
    password: '23'
}

describe('Login controller (e2e)', () => {
    let app: INestApplication
    let token: string

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    })

    it('/auth/login - success', async (done) => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send(testLoginDto)
            .expect(200)
            .then(({ body }: request.Response) => {
                token = body.access_token
                expect(token).toBeDefined();
                done();
            })
    })

    it('/auth/login - fail password', () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send({...testLoginDto, password: '2'})
            .expect(401, {
                statusCode: 401,
                message: WRONG_PASSWORD,
                error: 'Unauthorized'
            })
    })
    it('/auth/login - fail password', () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send({...testLoginDto, login: 'aaaa@mail.com'})
            .expect(401, {
                statusCode: 401,
                message: USER_NOT_FOUND,
                error: 'Unauthorized'
            })
    })
})