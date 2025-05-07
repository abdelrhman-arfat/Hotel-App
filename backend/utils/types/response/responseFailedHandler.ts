import ApiResponse from "../../../interface/ApiResponse.js";

const responseFailedHandler = <T>(
  code: number,
  message: string
): ApiResponse<T> => {
  return {
    message,
    success: false,
    code,
    data: null,
  };
};
export default responseFailedHandler;
