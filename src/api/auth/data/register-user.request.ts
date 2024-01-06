export interface RegisterUserRequest {
  username: string;
  email: string;
  authentication: {
    password: string;
  };
  profile: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
  address: {
    building: string;
    street: string;
    town: string;
    county: string;
    city: string;
    postcode: string;
  };
}
