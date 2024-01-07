import mongoose, { Document, Schema, Types, model } from 'mongoose';

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

const AddressSchema: Schema<AddressDocument> = new mongoose.Schema({
  building: { type: String, required: true },
  street: { type: String, required: true },
  town: { type: String, required: true },
  county: String,
  city: { type: String, required: true },
  postcode: { type: String, required: true }
});

export const Address = model<AddressDocument>('Address', AddressSchema);
