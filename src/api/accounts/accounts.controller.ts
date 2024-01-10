import { Request, Response, Router } from 'express';
import { validationMiddleware } from '../../common/middlewares/validation';
import { CreateAccountDto, UpdateAccountDto } from './data/account.dto';
import { accountsService } from './accounts.service';
import { CreateAccountRequest, Address, UpdateAccountRequest } from './data/account.request';
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

  /**
   * @url api/accounts/{id}
   * @method POST
   * @param req Reqest
   * @param res Response
   */
  async updateAccount(req: Request, res: Response) {
    const { id } = req.params;
    const payload: UpdateAccountRequest = req.body;
    console.log(payload);
    console.log(typeof payload);
    res.send(await accountsService.updateAccount(id, payload));
  }

  /**
   * @url api/accounts/{id}
   * @method DELETE
   * @param req Reqest
   * @param res Response
   */
  async removeAccount(req: Request, res: Response) {
    const { id } = req.params;
    res.send(await accountsService.removeAccount(id));
  }

  /**
   * @url api/accounts/{id}/{addressId}
   * @method POST
   * @param req Reqest
   * @param res Response
   */
  async removeAccountAddress(req: Request, res: Response) {
    const { id } = req.params;
    const { addressId } = req.params;
    res.send(await accountsService.removeAccountAddress(id, addressId));
  }

  private intialize() {
    this.router.get(`${this.apiPrefix}`, authorizeRole(AuthRole.User), this.getAllAccounts);
    this.router.get(`${this.apiPrefix}/:id`, authorizeRole(AuthRole.User), this.getAccount); // populate with addresses
    this.router.post(
      `${this.apiPrefix}`,
      [authorizeRole(AuthRole.User), validationMiddleware(CreateAccountDto)],
      this.addAccount
    );
    this.router.post(
      `${this.apiPrefix}/:id/addresses`,
      [authorizeRole(AuthRole.User), validationMiddleware(AddressDto)],
      this.addAccountAddress
    );
    // TODO:  ROLE: MANAGER - update account
    this.router.post(
      `${this.apiPrefix}/:id`,
      [authorizeRole(AuthRole.Manager), validationMiddleware(UpdateAccountDto)],
      this.updateAccount
    );
    //this.router.post(`${this.apiPrefix}/:id`, authorizeRole(AuthRole.Manager), this.updateAccount);

    // TODO:  ROLE: ADMIN -   remove an account
    this.router.delete(`${this.apiPrefix}/:id`, this.removeAccount);

    // TODO:  ROLE: MANAGER - add route for removing address,
    this.router.post(`${this.apiPrefix}/:id/:addressId`, this.removeAccountAddress);

    // TODO:  ROLE: MANAGER - add route for updating address,
    //this.router.post(`${this.apiPrefix}/:id/:addressId`, this.updateAddress);
  }
}

const accountsCtrl = new AccountsController();
export default accountsCtrl;
