//import { Types } from 'mongoose';

export interface UserProfile {
  firstName: string;
  middleName: string;
  lastName: string;
  avatar?: string;
}

export interface Address {
  building: string;
  street: string;
  town: string;
  county: string;
  city: string;
  postcode: string;
}

export interface Authentication {
  password: string;
  lastChanged: Date;
  role: number;
}

export interface BaseUser {
  username: string;
  email: string;
  mobile: string;
  profile: UserProfile;
  address: Address;
  authentication: Authentication;
}

// User currently not being used anywhere
// export interface User {
//   _id: Types.ObjectId;
//   username: string;
//   email: string;
//   mobile: string;
//   profile: UserProfile;
//   address: Address;
//   authentication: Authentication;
// }
