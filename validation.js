//VALIDATION
const Joi = require("joi");

//Register validation
const RegisterValidation = (data) => {
  const Validateschema = Joi.object({
    fullname: Joi.string().min(6).required(),
    email: Joi.string().min(6).required(),
    password: Joi.string().min(5).required(),
  });
  return Validateschema.validate(data);
};

//Lgin validation
const LoginValidation = (data) => {
  const Validateschema = Joi.object({
    //fullname: Joi.string().min(6).required(),
    email: Joi.string().min(6).required(),
    password: Joi.string().min(5).required(),
  });
  return Validateschema.validate(data);
};

module.exports.RegisterValidation = RegisterValidation;
module.exports.LoginValidation = LoginValidation;
