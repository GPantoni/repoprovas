import { faker } from '@faker-js/faker';
import supertest from 'supertest';
import app from '../../src/index.js';
import { createUser } from './authFactory.js';

export async function validToken() {
  const user = await createUser();
  const response = await supertest(app)
    .post('/sign-in')
    .send({ email: user.email, password: user.password });
  const token: string = response.body.token;

  return token;
}

export async function testDataGenerator() {
  const testData = {
    name: faker.hacker.phrase(),
    pdfUrl: faker.internet.url(),
    categoryId: faker.datatype.number({ min: 1, max: 3 }),
    teacherDisciplineId: faker.datatype.number({ min: 1, max: 6 }),
  };

  return testData;
}

export const invalidToken = faker.datatype.uuid();
