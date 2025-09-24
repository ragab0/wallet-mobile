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

export interface UpdateUserData {
  fname: string;
  lname: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
