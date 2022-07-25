import testUtils from '../utils/testUtils.js';
import {
  CreateTestData,
  testRepository,
} from '../repositories/testRepository.js';

async function createTest(createTestData: CreateTestData) {
  await testUtils.validateTestData(createTestData);

  return await testRepository.createTest(createTestData);
}

const testService = { createTest };

export default testService;
