export interface paymentData {
  email: string;
  phoneNumber: string;
  membershipTier: string;
  dob: string;
  amount: number;
  physicalAddress: string;
  city: string;
  useDefaultNumber: boolean;
}

export interface paymentResponse {
  message: string;
  status: boolean;
  reference: string;
}

export interface paymentError {
  message: string;
}
