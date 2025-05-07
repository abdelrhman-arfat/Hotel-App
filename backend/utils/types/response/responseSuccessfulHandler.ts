import ApiResponse from "../../../interface/ApiResponse.js";

const responseSuccessfulHandler = <T>(
  message: string,
  code: number,
  data: T
): ApiResponse<T> => {
  return {
    message,
    success: true,
    code,
    data,
  };
};

export default responseSuccessfulHandler;
