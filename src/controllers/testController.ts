import { Request, Response } from 'express';
import { CreateTestData } from '../repositories/testRepository';
import testService from '../services/testService.js';

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
