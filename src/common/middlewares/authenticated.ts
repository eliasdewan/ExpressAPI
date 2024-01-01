import { Request, Response, NextFunction } from 'express';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  // const error = new Error(`Not found - ${req.originalUrl}`);
  // res.status(404);
  next();
};
