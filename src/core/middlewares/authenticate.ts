import { Request, Response, NextFunction } from 'express';

import * as jwt from '../utils/jwt';
import UnauthorizedError from '../exceptions/UnauthorizedError';

/**
 * A middleware to authenticate the authorization token i.e. access token.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    res.locals.accessToken = String(req.headers.authorization).replace(
      'Bearer ',
      ''
    );
    if (!req.headers.authorization || !res.locals.accessToken) {
      throw new UnauthorizedError('No token in authorization header.');
    }

    const response: any = jwt.verifyAccessToken(res.locals.accessToken);

    res.locals.loggedInPayload = response.data;

    next();
  } catch (err: any) {
    if (err.name == 'JsonWebTokenError' || err.name =='TokenExpiredError') {
      next(new UnauthorizedError('Your token is invalid or expired.'));
    } else {
      next(err);
    }
  }
}

export default authenticate;
