import supertest from 'supertest';
import app from '../src/index.js';
import prisma from '../src/config/database.js';
import {
  createUser,
  signInFactory,
  signUpFactory,
} from './factories/authFactory.js';

beforeEach(async () => await prisma.$executeRaw`TRUNCATE TABLE users;`);

afterAll(async () => await prisma.$disconnect());

describe('POST /signup', () => {
  it('should return 201 given valid sign up data', async () => {
    const body = signUpFactory();

    const response = await supertest(app).post('/signup').send(body);
    expect(response.status).toBe(201);
  });

  it('should return 409 given an unavailable email', async () => {
    const preExistentUser = await createUser();
    const body = {
      email: preExistentUser.email,
      password: preExistentUser.password,
      passwordConfirmation: preExistentUser.password,
    };

    const response = await supertest(app).post('/signup').send(body);
    expect(response.status).toBe(409);
  });
});

describe('POST /signin', () => {
  it('should return 200 given valid sign in data', async () => {
    const registeredUser = await createUser();
    const body = {
      email: registeredUser.email,
      password: registeredUser.password,
    };

    const response = await supertest(app).post('/signin').send(body);
    expect(response.status).toBe(200);
  });

  it('should return 404 given an unregistered user', async () => {
    const body = signInFactory();

    const response = await supertest(app).post('/signin').send(body);
    expect(response.status).toBe(404);
  });
});
