import { Request } from 'express';
import { User } from '../database/models/user.schema';

export interface AuthenticatedRequest extends Request {
  user: User;
}
