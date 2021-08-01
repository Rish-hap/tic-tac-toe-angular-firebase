import * as express from "express"
import { auth } from "../middlewares/auth"
import { refresh_token } from "../middlewares/refresh_token"

const validate = require("../middlewares/validate")
const authController = require("../controller/auth.controller")
const authValidator = require("../validations/auth.validations")

const router = express.Router()

console.log("Inside avatars.route")

router.post('/signIn', validate(authValidator.signIn), authController.signIn)
router.post('/signUp', validate(authValidator.signUp), authController.signUp)
router.post('/isAuth', refresh_token, auth, authController.isAuth)
router.post('/getToken', refresh_token, authController.getToken)

module.exports = router