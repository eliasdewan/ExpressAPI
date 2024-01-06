export abstract class BaseError extends Error {
  abstract statusCode: number;

  constructor(public message: string = 'An error occured') {
    super();
  }
}

export class NotFoundError extends BaseError {
  statusCode = 404;
  message: string;

  constructor(message: string = 'Not Found') {
    super(message);
    this.message = message;
  }
}

export class ServerError extends BaseError {
  statusCode = 500;
  message: string;

  constructor(message: string = 'Internal server error') {
    super(message);
    this.message = message;
  }
}

export class BadRequestError extends BaseError {
  statusCode = 400;
  message: string;

  constructor(message: string = 'Bad request') {
    super(message);
    this.message = message;
  }
}

export class UnauthorizedError extends BaseError {
  statusCode = 401;
  message: string;

  constructor(message: string = 'Unauthorized, plaease sign in') {
    super(message);
    this.message = message;
  }
}

export class ForbiddenError extends BaseError {
  statusCode = 403;
  message: string;

  constructor(message: string = 'Forbdden, permission not allowed') {
    super(message);
    this.message = message;
  }
}
