export type ErrorResponseType = {
  statusCode: number;
  message: string | string[] | {};
};
const ErrorResponse = (
  statusCode: number,
  message: string | string[] | {}
): ErrorResponseType => {
  return { statusCode, message };
};

export default ErrorResponse;
