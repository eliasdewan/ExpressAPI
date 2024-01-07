export interface BaseAccount {
  businessName: string;
  website?: string;
  domain: string;
  phone: string;
  onboarding: Date;
  addresses: Address[]; // nested
}

export interface Address {
  building: string;
  street: string;
  town: string;
  county: string;
  city: string;
  postcode: string;
}
