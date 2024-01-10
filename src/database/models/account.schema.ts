import mongoose, { Document, Model, Schema, Types, model } from 'mongoose';
import { BaseAccount } from '../../api/accounts/data/account';

// export interface Account extends BaseAccount {
//   //
// }

export interface AccountDocument extends BaseAccount, Document {
  _id: Types.ObjectId;
}

export interface AccountModel extends Model<AccountDocument> {
  getAllAccounts(): AccountDocument[];
  getAccount(id: string): AccountDocument;
  findAddresses(id: string): AccountDocument;
  addAddressToAccount(id: string, addressId: string): AccountDocument;

  updateAccount(id: string, newProperties: Partial<AccountDocument>): AccountDocument;
  removeAccount(id: string): AccountDocument;
  removeAccountAddress(id: string, addressId: string): AccountDocument;
  // AccountExist(businessName: string): AccountDocument;
  // findAccount(): AccountDocument;
  // searchAccounts(): AccountDocument[];
}

//const AccountSchema: Schema<AccountDocument, AccountModel> = new mongoose.Schema(

const AccountSchema: Schema<AccountDocument, AccountModel> = new mongoose.Schema(
  {
    businessName: { type: String, required: true },
    website: { type: String },
    domain: String,
    phone: String,
    onboarding: Date,
    addresses: [{ type: Types.ObjectId, ref: 'Address' }]
  },
  { timestamps: true }
);

// AccountSchema.pre<AccountDocument>('save', function (this: AccountDocument, next) {
//   if (this.isModified('authentication.password')) {
//     const salt = genSaltSync(10);
//     const hash = hashSync(this.authentication.password, salt);
//     this.authentication.password = hash;
//     this.authentication.lastChanged = new Date();
//     return next();
//   }
// });

AccountSchema.statics.getAllAccounts = function (this: Model<AccountDocument>) {
  return this.find({}).populate('addresses'); // added populate
};

AccountSchema.statics.getAccount = function (this: Model<AccountDocument>, id: string) {
  return this.findById(id).populate('addresses'); // added populate
};

AccountSchema.statics.searchAccounts = function (this: Model<AccountDocument>, query: string) {
  return this.find({ businessName: { $regex: query, $options: 'i' } });
};

AccountSchema.statics.findAddresses = function (this: Model<AccountDocument>, id: string) {
  return this.findById(id).populate('addresses');
};

AccountSchema.statics.removeAccount = function (this: Model<AccountDocument>, id: string) {
  return this.findOneAndDelete({ _id: id }).populate('addresses');
};
AccountSchema.statics.removeAccountAddress = function (this: Model<AccountDocument>, id: string, addressId: string) {
  return this.findOneAndUpdate({ _id: id }, { $pull: { addresses: addressId } });
  //remove the id from the list of addresses
};

AccountSchema.statics.updateAccount = function (
  this: Model<AccountDocument>,
  id: string,
  newProperties: Partial<AccountDocument>
) {
  return this.findByIdAndUpdate(id, newProperties, { returnDocument: 'after' }).populate('addresses');
};

AccountSchema.statics.addAddressToAccount = function (this: Model<AccountDocument>, id: string, addressId: string) {
  // eslint-disable-next-line prettier/prettier
  return this.findOneAndUpdate(
    { _id: id },
    { $push: { addresses: addressId } },
    { returnDocument: 'after' }
  ).populate('addresses');
};

export const Account = model<AccountDocument, AccountModel>('Account', AccountSchema);
