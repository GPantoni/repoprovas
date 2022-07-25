import { Request, Response } from 'express';
import { CreateTestData } from '../repositories/testRepository';
import { testService } from '../services/testService.js';

async function createTest(req: Request, res: Response) {
  const { name, pdfUrl, categoryId, teacherDisciplineId } = req.body;
  const test: CreateTestData = {
    name,
    pdfUrl,
    categoryId,
    teacherDisciplineId,
  };
  await testService.createTest(test);

  return res.sendStatus(201);
}

async function getTestsByTerm(req: Request, res: Response) {
  const tests = await testService.getTestsByTerm();

  return res.status(200).send(tests);
}

async function getTestsByTeacher(req: Request, res: Response) {
  const tests = await testService.getTestsByTeacher();

  return res.status(200).send(tests);
}

export const testController = { createTest, getTestsByTerm, getTestsByTeacher };
