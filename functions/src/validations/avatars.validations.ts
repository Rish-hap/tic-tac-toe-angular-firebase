import * as Joi from 'joi'

const post = {
  body: Joi.object().keys({
    avatars: Joi.array().items(Joi.object({
      src: Joi.string().required(),
      name: Joi.string().required(),
      selected: Joi.boolean().required(),
      id: Joi.number().required(),
      player: Joi.string().allow("").optional(),
      wins: Joi.number().required(),
      loss: Joi.number().required(),
    })).required()
  })
}

const get = {

}


module.exports = {
  post: post,
  get: get
}