import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import validate from '../utils/validate';

/**
 * A middleware to validate schema.
 *
 * @param {Joi.Schema} params
 */
export function schema(params: Joi.Schema) {
  return async (
    req: Request,
    _: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await validate(req.body, params);

      next();
    } catch (err) {
      next(err);
    }
  };
}
