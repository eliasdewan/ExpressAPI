import { Request, Response, Router } from 'express';
import { validationMiddleware } from '../../common/middlewares/validation';
import { createAccountDto } from './data/account.dto';
import { accountsService } from './accounts.service';
import { CreateAccountRequest, Address } from './data/account.request';
import { AddressDto } from '../auth/dtos/register-user.dto';
import { AuthRole } from '../auth/data/auth-role.enum';
import { authorizeRole } from '../../common/middlewares/authorization';

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
    this.router.get(`${this.apiPrefix}`, authorizeRole(AuthRole.User), this.getAllAccounts);
    this.router.get(`${this.apiPrefix}/:id`, authorizeRole(AuthRole.User), this.getAccount); // populate with addresses
    this.router.post(
      `${this.apiPrefix}`,
      [authorizeRole(AuthRole.User), validationMiddleware(createAccountDto)],
      this.addAccount
    );
    this.router.post(
      `${this.apiPrefix}/:id/addresses`,
      [authorizeRole(AuthRole.User), validationMiddleware(AddressDto)],
      this.addAccountAddress
    );
    // TODO:  ROLE: MANAGER - update account
    // TODO:  ROLE: ADMIN -   remove an account
    // TODO:  ROLE: MANAGER - add route for removing address,
    // TODO:  ROLE: MANAGER - add route for updating address,
  }
}

const accountsCtrl = new AccountsController();
export default accountsCtrl;
