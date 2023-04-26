const Joi = require('joi');
const registerSchema = Joi.object({
  age: Joi.number().required().min(0),
  name: Joi.string().required().min(3),
  username: Joi.string().required().min(3),
  password: Joi.string().required().min(3),
  confirmPassword: Joi
    .any()
    .equal(Joi.ref("password"))
    .required()
    .label("Confirm password")
    .messages({ message: "Password must match" }),
  email: Joi.string().required().email(),
  gender: Joi.bool().required(),
});

const loginSchema = Joi.object({
  username: Joi.string().required().min(3),
  password: Joi.string().required().min(3),
});

const updateSchema = Joi.object({
  name: Joi.string().min(3),
  age: Joi.number().min(0),
  gender: Joi.bool(),
});

module.exports ={ registerSchema, loginSchema, updateSchema };