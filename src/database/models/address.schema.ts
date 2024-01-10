import mongoose, { Document, Model, Schema, Types, model } from 'mongoose';

export interface IAddress {
  building: string;
  street: string;
  town: string;
  county: string;
  city: string;
  postcode: string;
}

export interface AddressDocument extends IAddress, Document {
  _id?: Types.ObjectId;
}

export interface AddressModel extends Model<AddressDocument> {
  removeAddress(id: string): Types.ObjectId;
}

const AddressSchema: Schema<AddressDocument, AddressModel> = new mongoose.Schema({
  building: { type: String, required: true },
  street: { type: String, required: true },
  town: { type: String, required: true },
  county: String,
  city: { type: String, required: true },
  postcode: { type: String, required: true }
});

AddressSchema.statics.removeAddress = function (this: Model<AddressDocument>, id: string) {
  return this.deleteOne({ _id: id });
};

export const Address = model<AddressDocument, AddressModel>('Address', AddressSchema);
