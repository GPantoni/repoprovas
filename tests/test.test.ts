import supertest from 'supertest';
import app from '../src/index.js';
import prisma from '../src/config/database.js';
import {
  invalidToken,
  testDataGenerator,
  validToken,
} from './factories/testFactory.js';

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

describe('GET /tests/terms', () => {
  it('should return 200 given a valid request', async () => {
    const token = await validToken();

    const response = await supertest(app)
      .get('/tests/terms')
      .auth(token, { type: 'bearer' });
    expect(response.status).toBe(200);
  });

  it('should return 400 given a request without token', async () => {
    const response = await supertest(app).get('/tests/terms');
    expect(response.status).toBe(400);
  });

  it('should return 401 given a request with invalid token', async () => {
    const response = await supertest(app)
      .get('/tests/terms')
      .auth(invalidToken, { type: 'bearer' });
    expect(response.status).toBe(401);
  });
});

describe('GET /tests/teachers', () => {
  it('should return 200 given a valid request', async () => {
    const token = await validToken();

    const response = await supertest(app)
      .get('/tests/teachers')
      .auth(token, { type: 'bearer' });
    expect(response.status).toBe(200);
  });

  it('should return 400 given a request without token', async () => {
    const response = await supertest(app).get('/tests/teachers');
    expect(response.status).toBe(400);
  });

  it('should return 401 given a request with invalid token', async () => {
    const response = await supertest(app)
      .get('/tests/teachers')
      .auth(invalidToken, { type: 'bearer' });
    expect(response.status).toBe(401);
  });
});
