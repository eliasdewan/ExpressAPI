export interface RegisterUserRequest {
  username: string;
  profile: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
  email: string;
  address: {
    building: string;
    street: string;
    town: string;
    county: string;
    city: string;
    postcode: string;
  };
  authentication: {
    password: string;
    salt: string;
  };
}
