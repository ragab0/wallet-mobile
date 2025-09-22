export interface User {
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
