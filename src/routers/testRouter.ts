import { Router } from 'express';
import validateSchema from '../middlewares/validateSchemaMiddleware.js';
import validateToken from '../middlewares/validateTokenMiddleware.js';
import { createTestSchema } from '../schemas/testSchemas.js';
import testService from '../services/testService.js';

const testRouter = Router();

testRouter.post(
  '/tests/create',
  validateSchema(createTestSchema),
  validateToken,
  testService.createTest
);

export default testRouter;
