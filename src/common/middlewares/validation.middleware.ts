import { NextFunction, Request, Response } from 'express';
import { validationPipe } from '../pipes/validation.pipe';

export const validationMiddleware =
  (validationSchema: any) => async (req: Request, res: Response, next: NextFunction) => {
    const result: any = await validationPipe(validationSchema, { ...req.body, ...req.params });
    console.log('result BOOK ADDED');
    console.log(result);
    if (result.length) {
      const formatted = result.map((e: any) => ({ property: e.property, ...e.constraints }));
      return res.status(400).json({ sucess: false, result: formatted });
    }

    next();
    return true;
  };
