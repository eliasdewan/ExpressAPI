import { Address, AddressDocument } from '../../database/models/address.schema';
import { Account, AccountDocument } from '../../database/models/account.schema';
import { CreateAccountRequest, Address as CreateAddressRequest, updateAccountRequest } from './data/account.request';

class AccountService {
  constructor() {
    //
  }

  async getAccounts() {
    const accounts: AccountDocument[] = await Account.getAllAccounts(); // all accounts use the find method from mongoose and return
    return { sucess: true, result: accounts };
  }

  async getAccount(id: string) {
    const account: AccountDocument = await Account.getAccount(id);
    return { sucess: true, result: account };
  }

  async addAccount(payload: CreateAccountRequest) {
    try {
      const address: AddressDocument = await Address.create(payload.address);
      const account: AccountDocument = await Account.create({
        ...payload,
        onboarding: new Date(),
        addresses: [address._id]
      });
      const result = await Account.findAddresses(account._id.toString());
      return { success: true, result };
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Account creation failed' };
    }
  }
  async addAccountAddress(id: string, payload: CreateAddressRequest) {
    try {
      const address = await Address.create(payload);
      const updatedAccount = await Account.addAddressToAccount(id, address._id.toString());
      return { sucess: true, result: updatedAccount };
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Adding account address failed' };
    }
  }
  async updateAccount(id: string, payload: updateAccountRequest) {
    try {
      const updatedAccount = await Account.updateAccount(id, payload);
      return { sucess: true, result: updatedAccount };
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Account update fialed' };
    }
  }
  async removeAccount(id: string) {
    try {
      const removedAccount = await Account.removeAccount(id);
      return { sucess: true, result: removedAccount };
    } catch (error) {
      console.log(error);
      return { success: false, message: `Failed to remove account with id: ${id}` };
    }
  }
}
export const accountsService = new AccountService();
