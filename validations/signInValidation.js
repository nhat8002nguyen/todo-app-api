const Joi = require("joi");

const signInValidation = (data) => {
    const signInSchema = Joi.object().keys({
        email: Joi.string().email().min(6),
        password: Joi.string().min(6).max(1024),
    });

    return signInSchema.validate(data);
};

module.exports = signInValidation;
