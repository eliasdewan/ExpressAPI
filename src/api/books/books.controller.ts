import { Request, Response, Router } from 'express';
import { validationMiddleware } from '../../common/middlewares/validation';
import { Book, BookUpdatePayload } from './book';
import { BookDto } from './dtos/book.dto';
import { booksService } from './books.service';

class BooksController {
  public apiPrefix = '/books';
  public router = Router();

  constructor() {
    this.intialize();
  }

  /**
   * @url api/books
   * @method GET
   * @param req Reqest
   * @param res Response
   */
  getAllBooks(req: Request, res: Response) {
    const { page = 1, limit = 3 } = req.query;
    res.send(booksService.getBooks(+page, +limit));
  }

  /**
   * @url api/books/{id}
   * @method GET
   * @param req Reqest
   * @param res Response
   */
  getBook(req: Request, res: Response) {
    const { id } = req.params;
    res.send(booksService.getBook(id));
  }

  /**
   * @url api/books
   * @method POST
   * @param req Reqest
   * @param res Response
   */
  addBook(req: Request, res: Response) {
    const payload: Book = req.body;
    res.send(booksService.addBook(payload));
  }

  /**
   * @url api/books/{id}
   * @method PUT
   * @param req Reqest
   * @param res Response
   */
  updateBook(req: Request, res: Response) {
    /**
      #swagger.requestBody = {
        required: true,
        schema: { $ref: "#/components/schemas/UpdateBookRequest"}
      }
    */
    const { id } = req.params;
    const payload: BookUpdatePayload = req.body;
    res.send(booksService.updateBook(id, payload));
  }

  /**
   * @url api/books/{id}
   * @method DELETE
   * @param req Reqest
   * @param res Response
   */
  removeBook(req: Request, res: Response) {
    const { id } = req.params;
    res.send(booksService.removeBook(id));
  }

  private intialize() {
    this.router.get(`${this.apiPrefix}`, this.getAllBooks);
    this.router.get(`${this.apiPrefix}/:id`, this.getBook);
    this.router.post(`${this.apiPrefix}`, validationMiddleware(BookDto), this.addBook);
    this.router.put(`${this.apiPrefix}/:id`, this.updateBook);
    this.router.delete(`${this.apiPrefix}/:id`, this.removeBook);
  }
}

const booksCtrl = new BooksController();
export default booksCtrl;
