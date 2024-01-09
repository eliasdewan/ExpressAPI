import { Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { AunthenticatedRequest } from '../../types/authenticated-request';

export const authorizeRole = (role: number) => (req: AunthenticatedRequest, res: Response, next: NextFunction) => {
  const { user } = req;
  if (!user || !user.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Invalid or no authorizatioon.' });
  }

  const token = user.replace('Bearer ', '');
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
