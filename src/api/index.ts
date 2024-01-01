import { Router } from 'express';
import booksCtrl from './books/books.controller';
import authorsCtrl from './authors/authors.controller';

export const registerRoutes = (apiRouter: Router) => {
  // Integrating individual API routes to the main router
  apiRouter.use(booksCtrl.router);
  apiRouter.use(authorsCtrl.router);

  // this.apiRouter.use(authorsCtrl.router);
};
