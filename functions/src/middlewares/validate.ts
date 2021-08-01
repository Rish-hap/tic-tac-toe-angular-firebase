
import * as Joi from "joi"
import * as httpStatus from "http-status"
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');

const validate = (schema: any) => (req: any, res: any, next: any) => {

  const validSchema = pick(schema, ['params', 'query', 'body'])
  const object = pick(req, Object.keys(validSchema))
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' } })
    .validate(object)

  console.log(error, value)

  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    console.log(errorMessage,"error message")
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage))
  }

  Object.assign(req, value)
  return next()
}

module.exports = validate;