import { UserProfile } from './user';

export type LoginRequest = {
  username: string;
  password: string;
};

export type AuthResponse = {
  token: string;
  profile: UserProfile;
  email: string;
};
