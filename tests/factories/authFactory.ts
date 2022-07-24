import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

import prisma from '../../src/config/database.js';

export const signUpFactory = () => {
  const password = faker.internet.password();

  const body = {
    email: faker.internet.email(),
    password: password,
    passwordConfirmation: password,
  };

  return body;
};

export const signInFactory = () => {
  const body = {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  return body;
};

export async function createUser() {
  const user = {
    email: faker.internet.email(),
    password: faker.internet.password().toString(),
  };

  const createdUser = await prisma.user.create({
    data: { ...user, password: bcrypt.hashSync(user.password, 10) },
  });

  return {
    id: createdUser.id,
    email: user.email,
    password: user.password,
  };
}
