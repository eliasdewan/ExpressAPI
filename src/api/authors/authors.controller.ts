import { Request, Response, Router } from 'express';
import { validationMiddleware } from '../../common/middlewares/validation.middleware';
import { Author, AuthorUpdatePayload } from './author';
import { AuthorDto } from './author.dto';
import { authorsService } from './authors.service';

class AuthorsController {
  public apiPrefix = '';
  public router = Router();

  constructor() {
    this.intialize();
  }

  /**
   * @url api/authors
   * @method GET
   * @param req Reqest
   * @param res Response
   */
  getAllAuthors(req: Request, res: Response) {
    res.send(authorsService.getAuthors());
  }

  /**
   * @url api/authors/{id}
   * @method GET
   * @param req Reqest
   * @param res Response
   */
  getAuthor(req: Request, res: Response) {
    const { id } = req.params;
    res.send(authorsService.getAuthor(id));
  }

  /**
   * @url api/authors
   * @method POST
   * @param req Reqest
   * @param res Response
   */
  addAuthor(req: Request, res: Response) {
    const payload: Author = req.body;
    res.send(authorsService.addAuthor(payload));
  }

  /**
   * @url api/authors/{id}
   * @method PUT
   * @param req Reqest
   * @param res Response
   */
  updateAuthor(req: Request, res: Response) {
    /**
      #swagger.requestBody = {
        required: true,
        schema: { $ref: "#/components/schemas/UpdateAuthorRequest"}
      }
    */
    const { id } = req.params;
    const payload: AuthorUpdatePayload = req.body;
    res.send(authorsService.updateAuthor(id, payload));
  }

  /**
   * @url api/authors/{id}
   * @method DELETE
   * @param req Reqest
   * @param res Response
   */
  removeAuthor(req: Request, res: Response) {
    const { id } = req.params;
    res.send(authorsService.removeAuthor(id));
  }

  private intialize() {
    this.router.get(`${this.apiPrefix}`, this.getAllAuthors);
    this.router.get(`${this.apiPrefix}/:id`, this.getAuthor);
    this.router.post(`${this.apiPrefix}`, validationMiddleware(AuthorDto), this.addAuthor);
    this.router.put(`${this.apiPrefix}/:id`, this.updateAuthor);
    this.router.delete(`${this.apiPrefix}/:id`, this.removeAuthor);
  }
}

const authorsCtrl = new AuthorsController();
export default authorsCtrl;
