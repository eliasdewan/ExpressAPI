import { Router } from 'express';
import booksCtrl from './books/books.controller';
import authorsCtrl from './authors/authors.controller';
import authCtrl from './auth/auth.controller';

export const registerRoutes = (apiRouter: Router) => {
  // Integrating individual API routes to the main router
  apiRouter.use(booksCtrl.router);
  apiRouter.use(authorsCtrl.router);
  apiRouter.use(authCtrl.router);

  // this.apiRouter.use(authorsCtrl.router);
};
