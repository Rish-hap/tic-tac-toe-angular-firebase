import * as httpStatus from "http-status"

import { validationResult } from 'express-validator'
import { get_games, set_games } from "../service/game.service"


const post = async (req: any, res: any) => {
  let games_info = await get_games()
  const games = req.body.games

  if (games_info === null) {
    set_games([games])
  } else {
    set_games([games, ...games_info])
  }
  res.status(httpStatus.OK).send({ message: "Avatars added" })
}

const get = async (req: any, res: any) => {

  let games_info = await get_games()

  interface return_obj {
    message: string,
    success: boolean,
    data: Array<any>
  }
  if (games_info === null) {
    let obj: return_obj = {
      message: "Successfully fetched",
      success: true,
      data: []
    }
    res.status(httpStatus.OK).send({ ...obj })
  } else {
    let obj: return_obj = {
      message: "Successfully fetched",
      success: true,
      data: [...games_info]
    }
    res.status(httpStatus.OK).send(obj)
  }

}

const search = async (req: any, res: any) => {
  var errors = validationResult(req).array();
  if (errors.length !== 0) {
    res.status(httpStatus.BAD_REQUEST).json({ errors })
  } else {

    let games_info = await get_games()

    if (games_info) {
      const { avatar1, avatar2 } = req.query
      const player1 = new RegExp(req.query.player1, 'i')
      const player2 = new RegExp(req.query.player2, 'i')

      let results = games_info.filter((item: any) => {
        return (
          player1.test(item.player1.name)
          && player2.test(item.player2.name))
          && (avatar1 === '' ? true : avatar1 === item.player1.avatar)
          && (avatar2 === '' ? true : avatar2 === item.player2.avatar)
      })

      res.status(httpStatus.OK).send({
        message: results.legth === 0 ? "No games founf" : "Successfully traversed",
        success: true,
        data: results
      })
    } else {
      res.status(httpStatus.OK).send({
        message: "No Games Found",
        success: false,
        data: []
      })
    }
  }
}


module.exports = {
  post,
  get,
  search
}