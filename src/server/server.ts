import express, { NextFunction, Request, Response, Router } from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';

import { ServerConfig } from 'src/types/server.config';
import { errorHandler } from './middlewares/error.middleware';
import { registerRoutes } from '../api';
import swaggerOutput from '../swagger-output.json';
import mongoose from 'mongoose';

export default class Server {
  app: express.Application;
  config: ServerConfig;
  apiRouter: Router;

  constructor() {
    this.app = express();
    this.config = process.env as any;
    this.apiRouter = Router();

    // Register middlewares into the server
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(cors());
    this.app.use(express.static('public'));

    // Custom middlewares
    this.app.get('/favicon.ico', (_: Request, res: Response) => res.sendStatus(204));
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.setHeader('x-powered-by', 'Roni Book Server');
      next();
    });
    this.app.use(errorHandler);

    // Register Routing and Swagger
    this.app.use('/api', this.apiRouter);
    registerRoutes(this.apiRouter);
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));
  }

  start() {
    this.app.listen(this.config.PORT, () => {
      console.log(`${new Date()}: Server is running at http://localhost:${this.config.PORT}`);
      console.log(this.config.MONGO_URL);
      mongoose
        .connect(this.config.MONGO_URL)
        .then(() => console.log('Database connected.'))
        .catch((error) => console.log(error));
    });
  }
}
