import prisma from '../config/database.js';
import { User } from '@prisma/client';

export async function createUser(createUserData: SignUserData) {
  return await prisma.user.create({
    data: createUserData,
  });
}

export async function findUserByEmail(userEmail: string) {
  return await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });
}

export type SignUserData = Omit<User, 'id'>;
