import { StatusCodes } from 'http-status-codes';

import Error from './Error';

/**
 * @class BadRequestError
 * @extends {Error}
 */
class BadRequestError extends Error {
  /**
   * Error message to be thrown.
   *
   * @type {string}
   * @memberof BadRequestError
   */
  message: string;
  /**
   * Creates an instance of BadRequestError.
   *
   * @param {string} message
   * @memberof BadRequestError
   */
  constructor(message: string) {
    super(message, StatusCodes.BAD_REQUEST);

    this.message = message;
  }
}

export default BadRequestError;
