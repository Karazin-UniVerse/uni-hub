import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const mockPrisma = {
      $connect: jest.fn().mockResolvedValue(undefined),
      $disconnect: jest.fn().mockResolvedValue(undefined),
      certificateRequest: {
        findUnique: jest.fn().mockResolvedValue({
          id: 'cert-1',
          verificationCode: 'KZ-2026-DOC-4920',
          type: 'STUDY_CONFIRMATION',
          status: 'SIGNED',
          createdAt: new Date(),
          user: {
            name: 'Олександр Петренко',
            studentProfile: {
              specialty: 'Комп’ютерні науки',
              specialtyCode: '122',
              group: 'КС-12',
              university: 'ХНУ імені В. Н. Каразіна',
            },
          },
        }),
      },
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrisma)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/certificates/verify/:code (GET)', () => {
    return request(app.getHttpServer())
      .get('/certificates/verify/KZ-2026-DOC-4920')
      .expect(200)
      .expect((res) => {
        expect(res.body.valid).toBe(true);
        expect(res.body.studentName).toBe('Олександр Петренко');
      });
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });
});

