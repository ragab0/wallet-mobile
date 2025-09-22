import { User } from "./user";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  fname: string;
  lname: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface SendVerifyEmailRequest {
  email: string;
}

export interface SendVerifyEmailResponse {
  status: "success";
  message: string;
  data: {
    email: string;
    expires: string;
  };
}

export interface VerifyCodeRequest {
  email: string;
  code: string;
}

export interface AuthResponse {
  status: string;
  accessToken: string;
  refreshToken: string;
  data: User;
}
