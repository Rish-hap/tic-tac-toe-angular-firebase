import * as httpStatus from "http-status"
import { avatars } from "../config/avatars"

import { get_avatars, set_avatars, update_avatars } from "../service/avatar.service"



const post = async (req: any, res: any) => {

  let avatars_stats = await get_avatars()

  if (avatars_stats === null) {           // when avatars array is empty in database
    set_avatars(avatars)
  } else {                           // updating the avatars array in database
    update_avatars(req.body.avatars)
  }

  res.status(httpStatus.OK).send({ message: "Avatars stats updated" })

}

const get = async (req: any, res: any) => {
  let avatars_stats = await get_avatars()
  interface return_obj {
    message: string,
    success: boolean,
    data: Array<any>
  }

  if (avatars_stats === null) {
    set_avatars(avatars)

    let obj: return_obj = {
      message: "Successfully fetched",
      success: true,
      data: avatars
    }
    res.status(httpStatus.OK).send({ ...obj })

  } else {
    let obj: return_obj = {
      message: "Successfully fetched",
      success: true,
      data: [...avatars_stats]
    }
    res.status(httpStatus.OK).send(obj)
  }

}


module.exports = {
  post,
  get
}