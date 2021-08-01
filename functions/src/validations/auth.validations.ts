import * as Joi from 'joi'

const signIn = {
  body: Joi.object().keys({
      name: Joi.string().required(),
      password: Joi.string().required()
  })
}

const signUp = {
  body: Joi.object().keys({
      name: Joi.string().required(),
      password: Joi.string().required()
  })
}


module.exports = {
   signIn, signUp
}