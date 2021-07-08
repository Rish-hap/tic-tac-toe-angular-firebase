import * as express from "express"

const validate = require("../middlewares/validate")
const gameController = require("../controller/game.controller")
const gamesValidation = require("../validations/game.validations")

const router = express.Router()

console.log("Inside game.route")

router.post('/addGame', validate(gamesValidation.post), gameController.post)
router.get('/search', gamesValidation.search, gameController.search)
router.get('/allGames', gameController.get)

module.exports = router