export interface ApiResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  totalCount?: number;
  page?: number;
  errors?: string[] | null;
  data: T;
}
