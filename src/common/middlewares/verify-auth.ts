import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { User } from '../../database/models/user.schema';
import { JWTPayload } from '../../types/jwt-payload';

export const verifyAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authHedeader = req.header('Authorization');
  if (!authHedeader || !authHedeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Invalid or no authorizatioon.' });
  }

  const token = authHedeader.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ success: false, message: 'Missing aut token' });
  }

  try {
    const decoded: JWTPayload = jwt.verify(token, (process.env as any).JWT_SECRET) as JWTPayload;
    (req as any).user = await User.findUser(decoded.id);
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, message: 'Invalid auth token' });
  }
  return '';
};
