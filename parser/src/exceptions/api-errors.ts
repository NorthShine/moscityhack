export default class ApiError extends Error {
  status: number;
  errors: Array<any>;

  constructor(status: number, message: string, errors: Array<any>) {
    // @ts-ignore
    super(message, errors);
    this.status = status;
    this.errors = errors;
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  static unauthorized(message = 'User unauthorized', errors: Array<any> = []) {
    return new ApiError(401, message, errors);
  }

  static badRequest(message = 'Bad request', errors: Array<any> = []) {
    return new ApiError(400, message, errors);
  }

  static forbidden(message = 'Forbidden', errors: Array<any> = []) {
    return new ApiError(403, message, errors);
  }

  static notFound(message = 'Not found', errors: Array<any> = []) {
    return new ApiError(404, message, errors);
  }

  static requestTimeout(message = 'Request timeout', errors: Array<any> = []) {
    return new ApiError(408, message, errors);
  }

  static internalError(message = 'Internal Server Error', errors: Array<any> = []) {
    return new ApiError(500, message, errors);
  }
}
