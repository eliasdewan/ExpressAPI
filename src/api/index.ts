import { Router } from 'express';
import booksCtrl from './books/books.controller';
import authorsCtrl from './authors/authors.controller';
import authCtrl from './auth/auth.controller';
import accountsCtrl from './accounts/accounts.controller';
import { verifyAuth } from '../common/middlewares/verify-auth';

export const registerRoutes = (apiRouter: Router) => {
  // Integrating individual API routes to the main router
  // public auth routes
  apiRouter.use(authCtrl.router);
  // protected routes
  apiRouter.use(booksCtrl.router, verifyAuth);
  apiRouter.use(authorsCtrl.router, verifyAuth);
  apiRouter.use(accountsCtrl.router, verifyAuth);

  // this.apiRouter.use(authorsCtrl.router);
};
