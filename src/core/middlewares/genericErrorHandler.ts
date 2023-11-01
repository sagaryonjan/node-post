import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

//import logger from '../utils/logger';
//import APIResponseInterface from '../common/dto/apiResponse.dto';

/**
 * Build error response for validation errors.
 *
 * @param  {Error} err
 * @return {Object}
 */
function buildError(err: any) {
  if (err.isJoi) {
    return {
      code: StatusCodes.BAD_REQUEST,
      message: getReasonPhrase(StatusCodes.BAD_REQUEST),
      data:
        err.details &&
        err.details.map((error: any) => ({
          param: error.path.join('.'),
          message: error.message
        }))
    };
  }


  if (err.isCustom) {
    return {
      code: err.statusCode,
      message: err.message
    };
  }

  return {
    code: StatusCodes.INTERNAL_SERVER_ERROR,
    message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
  };
}

/**
 * Generic error response middleware for internal server errors.
 *
 * @param  {any} err
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 * @returns void
 */
export default function genericErrorHandler(
  err: any,
  _: Request,
  res: Response,
  // TODO: Remove this.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  __: NextFunction
): void {
  const error = buildError(err);


  res.status(error.code).json(error);
}
