const express = require('express');
const cors = require('cors')
import  { errorHandler } from "./middlewares/error"


import * as routes from "./routes"
import * as httpStatus from "http-status"
const ApiError = require("./utils/ApiError")


// Create Express app
const app = express()

// CORS Enabled
app.use(cors())

app.use('/v1', routes)

// send back a 404 error for any unknown api request
app.use((req: any, res: any, next: any) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not Found'))
})

// handle error
app.use(errorHandler);


module.exports = app