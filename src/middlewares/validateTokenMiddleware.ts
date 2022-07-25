import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import errorUtils from '../utils/errorUtils.js';
import dotenv from 'dotenv';
dotenv.config();

async function validateToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    throw errorUtils(400, 'Missing Token');
  }

  const [, token] = authorization.split(' ');

  try {
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    res.locals.decodeToken = decodeToken;
    next();
  } catch (error) {
    // throw errorUtils(401, 'Invalid/Expired token');
    throw errorUtils(401, `${error}`);
  }
}

export default validateToken;
