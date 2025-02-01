export interface ShippingInfo {
  name: string;
  zipCode: string;
  address1: string;
  address2: string;
  phone: string;
  email: string;
}

export interface ShippingInfoError {
  zipCode: string;
}
