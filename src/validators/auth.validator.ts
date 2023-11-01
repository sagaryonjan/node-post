import Joi from 'joi';

/**
 * Login Validator.
 */
const loginValidator: Joi.Schema = Joi.object({
  email: Joi.string().email().required(),
	password: Joi.string().required(),
});

export { loginValidator };
