export interface ApiResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  errors?: string[] | null;
  data: T;
}
