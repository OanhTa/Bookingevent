export interface LoginResponseDto {
  data(data: any): string;
  message: string | undefined;
  token: string;
  userId: string;
  email: string;
  fullName: string;
  expiry: string;          // hoặc Date nếu bạn muốn convert
  roles: string[];
  avatarUrl: string;
}
