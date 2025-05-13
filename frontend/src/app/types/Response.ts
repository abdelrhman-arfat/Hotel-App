export type TResponse<T> = {
  data: {
    data: T;
    totalPages: number;
  };
  message: string;
  success: boolean;
  code: number;
};
