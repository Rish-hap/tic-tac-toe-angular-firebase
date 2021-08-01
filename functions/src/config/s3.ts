// const config = require('./config');
import { config } from './config'

import * as AWS from "aws-sdk"

const multerS3 = require('multer-s3')
const multer = require('multer')

console.log(config.s3, "S3 | config |")
AWS.config.update(config.s3.config)

const s3 = new AWS.S3()

const customMulter = multer({
  storage: multerS3({
    s3,
    bucket: config.s3.bucket,
    acl: 'public-read',
    metadata(req:any, file:any, cb:any) {
        
      cb(null, { fieldName: file.fieldname })
    },
    key(req:any, file:any, cb:any) {
     
      const originalName = file.originalname.split('.');
      const ext = `.${originalName[originalName.length - 1]}`;
      cb(null, originalName + Date.now().toString() + ext);
    },
  }),
})

 export {
  s3,
  customMulter,
}
