const Joi = require("joi");

const registerValidation = (data) => {
    const registerSchema = Joi.object().keys({
        email: Joi.string().email().min(6),
        password: Joi.string().min(6).max(1024),
        rePassword: Joi.string().min(6).max(1024),
    });

    return registerSchema.validate(data);
};

module.exports = registerValidation;
