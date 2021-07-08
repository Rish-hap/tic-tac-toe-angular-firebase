import * as Joi from 'joi'
import { query, check } from 'express-validator';

const post = {
  body: Joi.object().keys({
    games: Joi.object().keys({
      player1: Joi.object({
        name: Joi.string().required(),
        avatar: Joi.string().required(),
        moves: Joi.number().required(),
        time: Joi.number().required()
      }),
      player2: Joi.object({
        name: Joi.string().required(),
        avatar: Joi.string().required(),
        moves: Joi.number().required(),
        time: Joi.number().required()
      }),
      Time: Joi.string(),
      won: Joi.string().required(),
      _id: Joi.string().allow("").required()
    }).required()
  })
}

const get = {
  query: {
    total: Joi.number().required(),
    active: Joi.number().required(),
    pages: Joi.number().required(),
    limit: Joi.number().required()
  }
}

const search = [
  check('player1').isString().withMessage('Only letters and digits allowed in search.').trim(),
  query('player2').isString().withMessage('Only letters and digits allowed in type.').trim(),
  check('avatar1').isString().withMessage('Invalid Avatar').trim(),
  check('avatar2').isString().withMessage('Invalid Avatar').trim()
]

module.exports = {
  post: post,
  get: get,
  search: search
}