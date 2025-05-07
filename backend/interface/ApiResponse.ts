interface ApiResponse<T> {
  message: string;
  success: boolean;
  code: number;
  data: T | null;
}

export default ApiResponse;
