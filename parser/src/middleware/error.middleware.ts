import ApiError from '../exceptions/api-errors';
import { Response, Request, NextFunction } from 'express';

interface CustomError extends Error {
  status: number;
  errors: Array<any>;
}

export const errorMiddleware = (
  err: CustomError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  if (err instanceof ApiError) {
    return res.status(err.status).send({ message: err.message, errors: err.errors }).end();
  }
  return res
    .status(500)
    .json({ message: 'Internal Server Error', errors: [err.stack] })
    .end();
};
