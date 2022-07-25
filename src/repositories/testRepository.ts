import { Test } from '@prisma/client';
import prisma from '../config/database.js';

async function createTest(createTestData: CreateTestData) {
  return await prisma.test.create({ data: createTestData });
}

async function getTestsByTerm() {
  const tests = await prisma.term.findMany({
    select: {
      number: true,
      Discipline: {
        select: {
          name: true,
          TeacherDiscipline: {
            select: {
              teacher: { select: { name: true } },
              Test: {
                select: {
                  name: true,
                  pdfUrl: true,
                  category: { select: { name: true } },
                },
              },
            },
          },
        },
      },
    },
  });
  return tests;
}

async function getTestsByTeacher() {
  const tests = await prisma.teacher.findMany({
    select: {
      name: true,
      TeacherDiscipline: {
        select: {
          Test: {
            select: { name: true, pdfUrl: true, category: true },
          },
        },
      },
    },
  });
  return tests;
}

export type CreateTestData = Omit<Test, 'id'>;

export const testRepository = { createTest, getTestsByTerm, getTestsByTeacher };
