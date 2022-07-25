import testUtils from '../utils/testUtils.js';
import {
  CreateTestData,
  testRepository,
} from '../repositories/testRepository.js';

async function createTest(createTestData: CreateTestData) {
  await testUtils.validateTestData(createTestData);

  return await testRepository.createTest(createTestData);
}

async function getTestsByTerm() {
  const tests = await testRepository.getTestsByTerm();

  return tests;
}

async function getTestsByTeacher() {
  const tests = await testRepository.getTestsByTeacher();

  return tests;
}

export const testService = { createTest, getTestsByTerm, getTestsByTeacher };
