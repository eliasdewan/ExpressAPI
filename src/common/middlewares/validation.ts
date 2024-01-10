import { NextFunction, Request, Response } from 'express';
import { validationPipe } from '../pipes/validation.pipe';
import Logger from '../logging/logger';

export const validationMiddleware =
  (validationSchema: any) => async (req: Request, res: Response, next: NextFunction) => {
    const result: any = await validationPipe(validationSchema, { ...req.body, ...req.params });
    if (result.length) {
      const formatted = result.map((e: any) => ({ property: e.property, ...e.constraints }));
      Logger.error('Bad Request: validation failed on payload');
      return res.status(400).send({ sucess: false, errors: formatted });
    }

    next();
  };
