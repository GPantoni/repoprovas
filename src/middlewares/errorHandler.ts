import { Request, Response, NextFunction } from 'express';

export default function errorHandler(
  error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error.type) {
    return res.status(error.status).send(error.message);
  }

  console.log(error);
  return res.status(500).send(error);
}
