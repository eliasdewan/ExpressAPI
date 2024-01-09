import { Request } from 'express';
import { JWTPayload } from './jwt-payload';

export interface AunthenticatedRequest extends Request {
  user: JWTPayload;
}
