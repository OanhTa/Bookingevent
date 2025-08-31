export interface LoginResponseDto {
  token: string;
  userId: string;
  email: string;
  fullName: string;
  expiry: string;          // hoặc Date nếu bạn muốn convert
  roles: string[];
}
