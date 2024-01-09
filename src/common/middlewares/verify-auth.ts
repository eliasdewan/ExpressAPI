import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHedeader = req.header('Authorization');
  if (!authHedeader || !authHedeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Invalid or no authorizatioon.' });
  }

  const token = authHedeader.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ success: false, message: 'Missing aut token' });
  }

  try {
    const decoded = jwt.verify(token, (process.env as any).JWT_SECRET);
    (req as any).user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, message: 'Invalid auth token' });
  }
};
