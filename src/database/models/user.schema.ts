import mongoose, { Document, Schema } from 'mongoose';
import { Address, Authentication, UserProfile } from 'src/api/auth/data/user';

import { genSaltSync, hashSync } from 'bcrypt-ts';

export interface IUser extends Document {
  username: string;
  email: string;
  mobile: string;
  profile: UserProfile;
  address: Address;
  authentication: Authentication;
}

const UserSchema: Schema<IUser> = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    mobile: String,
    profile: {
      firstName: { type: String, required: true },
      middleName: String,
      lastName: { type: String, required: true },
      avatar: String
    },
    address: {
      building: { type: String, required: true },
      street: { type: String, required: true },
      town: { type: String, required: true },
      county: String,
      city: { type: String, required: true },
      postcode: { type: String, required: true }
    },
    authentication: {
      password: { type: String, required: true, selected: false },
      lastChanged: { type: Date, selected: false }
    }
  },
  { timestamps: true }
);

UserSchema.pre<IUser>('save', function (this: IUser, next) {
  if (this.isModified('authentication.password')) {
    const salt = genSaltSync(10);
    const hash = hashSync(this.authentication.password, salt);
    this.authentication.password = hash;
    this.authentication.lastChanged = new Date();
    return next();
  }
});

export const UserModel = mongoose.model('User', UserSchema);
