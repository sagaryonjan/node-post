import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

import * as authService from '../services/auth.service';

/**
 * User login api
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await authService.login(req.body);

    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      data
    });
  } catch (err) {
    next(err);
  }
}