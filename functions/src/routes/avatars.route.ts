import * as express from "express"

const validate =  require("../middlewares/validate")
const avatarsController =  require("../controller/avatar.controller")
const avatarsValidation = require("../validations/avatars.validations")

const router = express.Router()

console.log("Inside avatars.route")

router.post('/update', validate(avatarsValidation.post), avatarsController.post)
router.get('/allAvatars', validate(avatarsValidation.get), avatarsController.get)


module.exports = router