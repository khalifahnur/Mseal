export interface paymentData {
  email?: string;
  phoneNumber?: string;
  membershipTier?: string;
  dob?: string;
  amount: number;
  //physicalAddress?: string;
  city: string;
  useDefaultNumber?: boolean;
  paymentMethod?: string;
  isUpgrade?: boolean;
  paymentContext?:string;
}
/*eslint-disable @typescript-eslint/no-explicit-any*/ 
export interface paymentResponse {
  message: string;
  status: boolean;
  reference: string;
  data:any
  redirectUrl:string
}

export interface paymentError {
  message: string;
}

export interface ticketPayment{
  eventId:string;
  match:string;
  date:string;
  venue:string;
  quantity:number;
  amount:number;
  time:string;
  // phoneNUmber:string;
}

export interface walletPayment{
  amount:number;
  phoneNumber:string
}
