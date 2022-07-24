import joi from 'joi';
import { SignUserData } from '../repositories/authRepository.js';

export const signUpSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(10).required(),
  passwordConfirmation: joi
    .any()
    .equal(joi.ref('password'))
    .required()
    .label('Confirm password')
    .messages({ 'any.only': '{{#label}} does not match' }),
});

export const signInSchema = joi.object<SignUserData>({
  email: joi.string().email().required(),
  password: joi.string().min(10).required(),
});
