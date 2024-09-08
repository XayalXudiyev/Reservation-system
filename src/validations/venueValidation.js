const Joi = require("joi")

const venueValidation = (data) => {
  const schema = Joi.object({
    _id: Joi.string().optional(),
    name: Joi.string().min(3).required(),
    location: Joi.string().min(3).required(),
    capacity: Joi.number().integer().min(1).required(),
    description: Joi.string().optional(),
  })
  return schema.validate(data)
}

module.exports = {
  venueValidation,
}
