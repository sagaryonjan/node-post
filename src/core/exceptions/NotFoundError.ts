import { StatusCodes } from 'http-status-codes';

import Error from './Error';

/**
 * @class NotFound
 * @extends {Error}
 */
class NotFoundError extends Error {
  /**
   * Error message to be thrown.
   *
   * @type {string}
   * @memberof NotFound
   */
  message: string;

  /**
   * Creates an instance of NotFound.
   *
   * @param {string} message
   * @memberof NotFound
   */
  constructor(message: string) {
    super(message, StatusCodes.NOT_FOUND);

    this.message = message;
  }
}

export default NotFoundError;
