import { z } from 'zod';
import type { Request, Response, NextFunction } from 'express';
import parseNewPatient from './utils.ts';

export const newPatientParser = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    parseNewPatient(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

export default errorMiddleware;