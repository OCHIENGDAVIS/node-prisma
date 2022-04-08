import Joi from 'joi';

export const userCreateOrUpdateValidator = (req, res, next) => {
  const { body } = req;
  const schema = Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string().required(),
  });
  const { error, value } = schema.validate(body);
  if (error) {
    res
      .status(400)
      .json({ type: 'error', error: error.details.map((e) => e.message) });
  }
  next();
};
