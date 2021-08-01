import * as express from "express"
import { auth } from "../middlewares/auth"
import { refresh_token } from "../middlewares/refresh_token"

const validate = require("../middlewares/validate")
const gameController = require("../controller/game.controller")
const gamesValidation = require("../validations/game.validations")

const router = express.Router()

// console.log("game.route ++++++++++++")

router.post('/addGame', refresh_token, auth, validate(gamesValidation.post), gameController.post)
router.get('/search', refresh_token, auth, gamesValidation.search, gameController.search)
router.get('/allGames',refresh_token, auth, gameController.get)

module.exports = router