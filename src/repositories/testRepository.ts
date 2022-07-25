import { Test } from '@prisma/client';
import prisma from '../config/database.js';

async function createTest(createTestData: CreateTestData) {
  return await prisma.test.create({ data: createTestData });
}

export type CreateTestData = Omit<Test, 'id'>;

export const testRepository = { createTest };
