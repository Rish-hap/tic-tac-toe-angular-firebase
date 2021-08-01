const { customMulter } = require('../config/s3');

import * as express from "express"
// import { auth } from "../middlewares/auth"

const uploadController = require("../controller/upload.controller")

const  uploadImg = customMulter.any();

const router = express.Router();

console.log(uploadImg,"uploadImg")

router.route('/').patch( uploadImg, uploadController.uploadInS3);

module.exports = router;