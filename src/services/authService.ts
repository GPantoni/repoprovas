import { User } from '@prisma/client';
import { SignUserData } from '../repositories/authRepository.js';
import errorUtils from '../utils/errorUtils.js';
import * as authRepository from '../repositories/authRepository.js';
import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export async function signUp(createUserData: SignUserData) {
  const { email, password } = createUserData;
  const SALT = 10;

  const isEmailUnavailable = await authRepository.findUserByEmail(email);
  if (isEmailUnavailable) {
    throw errorUtils(409, 'Email already in use');
  }

  const hashedPassword = bcrypt.hashSync(password, SALT);

  createUserData = { ...createUserData, password: hashedPassword };

  await authRepository.createUser(createUserData);
}

export async function signIn(userData: SignUserData) {
  const { email, password } = userData;

  const user = await authRepository.findUserByEmail(email);
  if (!user) {
    throw errorUtils(404, 'Email not found');
  }

  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword) {
    throw errorUtils(401, 'Wrong email or password');
  }

  const token = Jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
}
