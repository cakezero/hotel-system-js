import Joi from "joi";

const userValidationSchema = Joi.object({
  user_name: Joi.string()
    .pattern(
      new RegExp(
        /^[a-zA-Z!@#$%^&*()_+\-=`~[\]{}|;:'",.<>/?]*[a-zA-Z]+[a-zA-Z0-9!@#$%^&*()_+\-=`~[\]{}|;:'",.<>/?]{2,29}$/
      )
    )
    .trim()
    .required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .trim()
    .required(),
  password: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*[!@#$%^&*()_+\\-=\\[\\]{};:'\",.<>/?])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};:'\",.<>/?]{3,30}$"
      )
    )
    .trim()
    .required(),
});

const loginValidationSchema = Joi.object({
  password: Joi.string()
    .pattern(
      new RegExp("^[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};:'\",.<>/?]{3,30}$")
    )
    .trim()
    .required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .trim()
    .optional(),
})
  
const uLoginValidationSchema = oi.object({
  user_name: Joi.string()
    .min(3)
    .pattern(new RegExp("^[a-zA-Z0-9-@!#$%&*():;,=?+/.]+$"))
    .max(30)
    .trim()
    .optional(),
  password: Joi.string()
    .pattern(
      new RegExp("^[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};:'\",.<>/?]{3,30}$")
    )
    .trim()
    .required(),
});

const resetPasswordValidationSchema = Joi.object({
  password: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*[!@#$%^&*()_+\\-=\\[\\]{};:'\",.<>/?])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};:'\",.<>/?]{3,30}$"
      )
    )
    .trim()
    .required(),
  resetToken: Joi.string().trim().required(),
});

export {
  userValidationSchema,
  loginValidationSchema,
  uLoginValidationSchema,
  resetPasswordValidationSchema,
};
