import mongoose, { Document, Model, Schema, Types, model } from 'mongoose';
import { compare, compareSync, genSaltSync, hashSync } from 'bcrypt';
import { Address, Authentication, BaseUser, UserProfile } from '../../api/auth/data/user';

// Newly created - using base user withouth the _id: base user same as Iuser
export interface User extends BaseUser {
  _id: Types.ObjectId;
}

// Not using iuser using BaseUser on user document
export interface IUser {
  username: string;
  email: string;
  mobile: string;
  profile: UserProfile;
  address: Address;
  authentication: Authentication;
}

export interface UserDocument extends BaseUser, Document {}

export interface UserModel extends Model<UserDocument> {
  userExist(username: string): UserDocument;
  findUser(): UserDocument;
  searchUsers(): UserDocument[];
  comparePasswords(password: string, hash: string): Promise<boolean>;
}

const UserSchema: Schema<UserDocument, UserModel> = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    mobile: String,
    authentication: {
      password: { type: String, required: true, selected: false },
      lastChanged: { type: Date, selected: false }
    },
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
    }
  },
  { timestamps: true }
);

UserSchema.pre<UserDocument>('save', function (this: UserDocument, next) {
  if (this.isModified('authentication.password')) {
    const salt = genSaltSync(10);
    const hash = hashSync(this.authentication.password, salt);
    this.authentication.password = hash;
    this.authentication.lastChanged = new Date();
    return next();
  }
});

UserSchema.methods.generateHash = function (password: string) {
  const salt = genSaltSync(10);
  return hashSync(password, salt);
};

UserSchema.methods.isPasswordValid = function (password: string) {
  return compareSync(password, this.authentication.password);
};

UserSchema.statics.userExist = async function (this: Model<UserDocument>, username: string) {
  return this.findOne({ $or: [{ username }, { email: username }] });
};

UserSchema.statics.findUser = async function (this: Model<UserDocument>, id: string) {
  return this.findById(id);
};

UserSchema.statics.searchUsers = async function (this: Model<UserDocument>, query: string) {
  return this.find({ 'profile.firstName': { $regex: query, $options: 'i' } });
};

UserSchema.statics.comparePasswords = async function (password: string, hash: string) {
  return compare(password, hash);
};

UserSchema.virtual('fullName').get(function (): string {
  return `${this.profile.firstName.trim()} ${this.profile.middleName.trim()} ${this.profile.lastName.trim()}`;
});

export const User = model<UserDocument, UserModel>('User', UserSchema);
