import Joi from 'joi';

/**
 * Post Validator.
 */
const postValidator : Joi.Schema = Joi.object({
  title: Joi.string().label('Title').required(),
  content: Joi.string().label('Content').required(),
  user_id: Joi.number().label('UserId').required(),
});

export { postValidator };
