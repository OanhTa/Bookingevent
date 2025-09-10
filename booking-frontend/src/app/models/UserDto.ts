export interface User {
  id ?: string;
  userName: string;
  email:string;
  phone: string;
  address: string;
  userRoles?: { role: { name: string } }[];
  roleIds?: [],
  organisationIds?: []
}
export interface UserFilter {
  id?: string;
  userName?: string;
  fullName?: string;
  email?: string;
  emailConfirmed?: boolean;
  emailConfirmedAt?: string;
  phone?: string;
  address?: string;
  createdAt?: string;
  lockoutEnabled?: boolean;
  lockoutEnd?: string;
  accessFailedCount?: number;
}

export interface RequestPasswordResetDto {
  email: string;
}

// reset-password.dto.ts
export interface ResetPasswordDto {
  token: string;
  newPassword: string;
}