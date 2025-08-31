export class RegisterRequest {
  name!: string;
  email!: string;
  password!: string;
}
export interface RegisterResponse {
  message: string;
}