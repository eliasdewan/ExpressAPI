import { Response, NextFunction } from 'express';
import { AuthRole } from '../../api/auth/data/auth-role.enum';
import { HTTP_STATUSES } from '../constants/http-status';

export const authorizeRole: any = (role: number) => (req: Request, res: Response, next: NextFunction) => {
  const { user } = req as any;
  const roles: number[] = Object.keys(AuthRole)
    .filter((v) => !isNaN(+v))
    .map((v) => +v);

  if (roles.indexOf(user.authentication.role) === -1) {
    return res.status(HTTP_STATUSES.FORBIDDEN_403).json({ sucess: false, mesasge: 'Forbidden! operation not allowed' });
  }

  if (user.authentication.role < role) {
    return res.status(HTTP_STATUSES.FORBIDDEN_403).json({ sucess: false, mesasge: 'Forbidden! operation not allowed' });
  }

  next();
};
