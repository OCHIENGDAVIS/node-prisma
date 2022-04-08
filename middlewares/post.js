import Joi from 'joi';

export const postCreateOrUpdateValidator = (req, res, next) => {
  const { body } = req;
  const schema = Joi.object({
    title: Joi.string().trim().required(),
    content: Joi.string().trim(),
  });
  const { error, value } = schema.validate(body);
  if (error) {
    return res
      .status(400)
      .json({ type: 'error', error: error.details.map((e) => e.message) });
  }
  next();
};
