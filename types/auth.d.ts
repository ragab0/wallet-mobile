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

interface User {
  id: string;
  email: string;
  fname: string;
  lname: string;
  picture?: string;
  role: string;
  isActive: boolean;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  status: string;
  accessToken: string;
  refreshToken: string;
  data: User;
}
