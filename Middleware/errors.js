

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = 400;
  }
}

module.exports = {
  NotFoundError,
  ValidationError,
};
// This module defines custom error classes for handling specific types of errors in the application.
// The `NotFoundError` is used for 404 errors, and the `ValidationError` is used for 400 errors.
// These classes extend the built-in `Error` class and include a `statusCode` property to indicate the HTTP status code associated with the error.