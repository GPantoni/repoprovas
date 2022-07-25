import { Router } from 'express';
import { testController } from '../controllers/testController.js';
import validateSchema from '../middlewares/validateSchemaMiddleware.js';
import validateToken from '../middlewares/validateTokenMiddleware.js';
import { createTestSchema } from '../schemas/testSchemas.js';

const testRouter = Router();

testRouter.post(
  '/tests/create',
  validateSchema(createTestSchema),
  validateToken,
  testController.createTest
);

testRouter.get('/tests/terms', validateToken, testController.getTestsByTerm);

testRouter.get(
  '/tests/teachers',
  validateToken,
  testController.getTestsByTeacher
);

export default testRouter;
