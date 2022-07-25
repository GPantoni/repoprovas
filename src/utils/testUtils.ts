import errorUtils from './errorUtils.js';
import prisma from '../config/database.js';
import { CreateTestData } from '../repositories/testRepository.js';

async function validateTestData(testInfo: CreateTestData) {
  const validCategory = await prisma.category.findFirst({
    where: { id: testInfo.categoryId },
  });
  console.log(validCategory);
  if (!validCategory) {
    throw errorUtils(404, 'Category not found');
  }

  const validDisciplineTeacher = await prisma.teacherDiscipline.findFirst({
    where: { id: testInfo.teacherDisciplineId },
  });
  console.log(
    validDisciplineTeacher,
    await prisma.teacherDiscipline.findMany()
  );
  if (!validDisciplineTeacher) {
    throw errorUtils(404, 'DisciplineTeacher not found');
  }

  return;
}

const testUtils = { validateTestData };

export default testUtils;
