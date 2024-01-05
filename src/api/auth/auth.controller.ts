import { Request, Response, Router } from 'express';
import { validationMiddleware } from '../../common/middlewares/validation';

import { authService } from './auth.service';
import { RegisterUserDto } from './dtos/register-user.dto';
import { RegisterUserRequest } from './data/register-user.request';

class AuthController {
  public apiPrefix = '/auth';
  public router = Router();

  constructor() {
    this.intialize();
  }

  /**
   * @url api/auth/register
   * @method POST
   * @param req Reqest
   * @param res Response
   */
  registerUser(req: Request, res: Response) {
    const { username, password, profile, email, address } = req.body as RegisterUserDto;
    const payload: RegisterUserRequest = {
      username,
      authentication: { password, salt: 'tbc' },
      profile,
      email,
      address
    };
    const result = authService.register(payload);
    res.send(result);
  }

  /**
   * @url api/auth/login
   * @method POST
   * @param req Reqest
   * @param res Response
   */
  async login(req: Request, res: Response) {
    res.send(await authService.signin(req.body));
  }

  /**
   * @url api/books
   * @method POST
   * @param req Reqest
   * @param res Response
   */
  // addBook(req: Request, res: Response) {
  //   const payload: Book = req.body;
  //   res.send(booksService.addBook(payload));
  // }

  /**
   * @url api/books/{id}
   * @method PUT
   * @param req Reqest
   * @param res Response
   */
  // updateBook(req: Request, res: Response) {
  //   /**
  //     #swagger.requestBody = {
  //       required: true,
  //       schema: { $ref: "#/components/schemas/UpdateBookRequest"}
  //     }
  //   */
  //   const { id } = req.params;
  //   const payload: BookUpdatePayload = req.body;
  //   res.send(booksService.updateBook(id, payload));
  // }

  /**
   * @url api/books/{id}
   * @method DELETE
   * @param req Reqest
   * @param res Response
   */
  // removeBook(req: Request, res: Response) {
  //   const { id } = req.params;
  //   res.send(booksService.removeBook(id));
  // }

  private intialize() {
    this.router.post(`${this.apiPrefix}/register`, validationMiddleware(RegisterUserDto), this.registerUser);
    this.router.post(`${this.apiPrefix}/signin`, this.login);
    // this.router.post(`${this.apiPrefix}`, validationMiddleware(BookDto), this.addBook);
    // this.router.put(`${this.apiPrefix}/:id`, this.updateBook);
    // this.router.delete(`${this.apiPrefix}/:id`, this.removeBook);
  }
}

const authCtrl = new AuthController();
export default authCtrl;
