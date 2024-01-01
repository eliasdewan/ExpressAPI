import { Router } from 'express';
import booksCtrl from './books/books.controller';
import authorsCtrl from './authors/authors.controller';

const { API_PREFIX = '/api' } = process.env;
export const ApiRouter = Router();

// Integrating individual API routes to the main router
ApiRouter.use(`${API_PREFIX}/books`, booksCtrl.router);
ApiRouter.use(`${API_PREFIX}/authors`, authorsCtrl.router);

// this.apiRouter.use(authorsCtrl.router);
