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

export interface CardInfo {
  cardType: string;
  cardNumber: string;
  expiryDate: string;
  cvc: string;
}
