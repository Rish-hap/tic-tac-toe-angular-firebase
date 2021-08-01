import * as express from "express"
import { auth } from "../middlewares/auth"
import { refresh_token } from "../middlewares/refresh_token"

const validate =  require("../middlewares/validate")
const avatarsController =  require("../controller/avatar.controller")
const avatarsValidation = require("../validations/avatars.validations")

const router = express.Router()

console.log("Inside avatars.route")

router.post('/update', refresh_token, auth , validate(avatarsValidation.post), avatarsController.post)
router.get('/allAvatars',  refresh_token, auth, validate(avatarsValidation.get), avatarsController.get)


module.exports = router