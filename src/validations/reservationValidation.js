const dayjs = require("dayjs")
const Joi = require("joi")

const customJoi = Joi.extend((joi) => ({
  type: "dayjsDate",
  base: joi.string(),
  messages: {
    "dayjsDate.base": `"{{#label}}" must be a valid date in YYYY-MM-DD format`,
    "dayjsDate.format": `"{{#label}}" must be in YYYY-MM-DD format`,
  },
  validate(value, helpers) {
    const isValid = dayjs(value, "YYYY-MM-DD", true).isValid()
    if (!isValid) {
      return { value, errors: helpers.error("dayjsDate.format") }
    }
  },
}))

const reservationValidation = (data) => {
  const schema = customJoi.object({
    venueId: Joi.string().required(),
    userId: Joi.string().required(),
    date: customJoi.dayjsDate().required(),
    time: Joi.string()
      .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
      .required()
      .messages({
        "string.pattern.base": `"time" must be in HH:MM format`,
      }),
    numberOfPeople: Joi.number().integer().min(1).required(),
  })

  return schema.validate(data)
}

module.exports = reservationValidation
