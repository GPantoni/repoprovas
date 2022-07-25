import supertest from 'supertest';
import app from '../src/index.js';
import prisma from '../src/config/database.js';
import { testDataGenerator, validToken } from './factories/testFactory.js';

beforeEach(async () => await prisma.$executeRaw`TRUNCATE TABLE users, tests;`);

afterAll(async () => await prisma.$disconnect());

describe('POST /tests/create', () => {
  it('should return 201 given valid test data', async () => {
    const token = await validToken();
    const body = await testDataGenerator();

    const response = await supertest(app)
      .post('/tests/create')
      .auth(token, { type: 'bearer' })
      .send(body);
    expect(response.status).toBe(201);
  });
});
