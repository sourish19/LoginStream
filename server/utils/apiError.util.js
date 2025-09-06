class ApiError extends Error {
  constructor(statusCode, message = '', error = [], stack) {
    super(message);
    ((this.success = false),
      (this.statusCode = statusCode),
      (this.message = message),
      (this.error = error));
    if (stack) this.stack = stack;
    else Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;
