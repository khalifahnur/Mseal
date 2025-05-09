export interface AuthData {
  firstName?: string;
  lastName?:string;
  email: string;
  phoneNumber?: string;
  password: string;
}

export interface AuthResponse {
  token?: string;
  user: {
    userId?: string;
    firstname?: string;
    lastname?: string;
    email?: string;
    phoneNumber?: string;
  };
}
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ErrorResponse {
  message: string;
  statusCode?: number;
  details?: { reason?: string; [key: string]: any };
}

export interface PhoneNumber{
  phoneNumber:string;
}

export interface PhoneNumberResponse{
  message:string
}

