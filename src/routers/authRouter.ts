import { Router } from 'express';
import validateSchema from '../middlewares/validateSchemaMiddleware.js';
import * as authController from '../controllers/authController.js';
import { signUpSchema, signInSchema } from '../schemas/authSchemas.js';

const authRouter = Router();

authRouter.post('/signup', validateSchema(signUpSchema), authController.signUp);

authRouter.post('/signin', validateSchema(signInSchema), authController.signIn);

export default authRouter;
