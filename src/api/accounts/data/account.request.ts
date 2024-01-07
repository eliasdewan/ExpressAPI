export interface FindAccountRequest {
  id: string;
}

export interface CreateAccountRequest {
  businessName: string;
  website: string;
  domain: string;
  phone: string;
  onboarding: Date;
  address: Address; // nested
}

export interface Address {
  building: string;
  street: string;
  town: string;
  county?: string;
  city: string;
  postcode: string;
}
