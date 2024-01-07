import { Request, Response, Router } from 'express';
import { validationMiddleware } from '../../common/middlewares/validation';
import { createAccountDto } from './data/account.dto';
import { accountsService } from './accounts.service';
import { CreateAccountRequest, Address } from './data/account.request';
import { AddressDto } from '../auth/dtos/register-user.dto';

class AccountsController {
  public apiPrefix = '/accounts';
  public router = Router();

  constructor() {
    this.intialize();
  }

  /**
   * @url api/accounts
   * @method GET
   * @param req Reqest
   * @param res Response
   */
  async getAllAccounts(req: Request, res: Response) {
    res.send(await accountsService.getAccounts());
  }

  /**
   * @url api/accounts/{id}
   * @method GET
   * @param req Reqest
   * @param res Response
   */
  async getAccount(req: Request, res: Response) {
    const { id } = req.params;
    const result = await accountsService.getAccount(id);
    res.send(result);
  }

  /**
   * @url api/accounts
   * @method POST
   * @param req Reqest
   * @param res Response
   */
  async addAccount(req: Request, res: Response) {
    const payload: CreateAccountRequest = req.body;
    res.send(await accountsService.addAccount(payload));
  }

  /**
   * @url api/accounts/{id}/addresses
   * @method POST
   * @param req Reqest
   * @param res Response
   */
  async addAccountAddress(req: Request, res: Response) {
    const { id } = req.params;
    const payload: Address = req.body;
    res.send(await accountsService.addAccountAddress(id, payload));
  }

  private intialize() {
    this.router.get(`${this.apiPrefix}`, this.getAllAccounts);
    this.router.get(`${this.apiPrefix}/:id`, this.getAccount); // populate with addresses
    this.router.post(`${this.apiPrefix}`, validationMiddleware(createAccountDto), this.addAccount);
    this.router.post(`${this.apiPrefix}/:id/addresses`, validationMiddleware(AddressDto), this.addAccountAddress);
  }
}

const accountsCtrl = new AccountsController();
export default accountsCtrl;
