import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const validatorMiddleware = (schema: z.ZodSchema<any>) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.issues });
    }
    res.status(400).json({ message: 'An unknown error occurred' });
  }
};
