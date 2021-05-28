const Joi = require("joi");

const itemValidation = (data) => {
    const itemSchema = Joi.object().keys({
        name: Joi.string().min(1),
        detail: Joi.string().min(1),
    });

    return itemSchema.validate(data);
};

module.exports = itemValidation;
