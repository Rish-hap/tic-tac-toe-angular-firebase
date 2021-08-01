import * as express from "express"
const gameRoute = require('./game.route');
const avatarsRoute = require('./avatars.route');
const authRoute = require('./auth.route')
const uploadRoute = require('./upload.route')

const router = express.Router();

const defaultRoutes = [
  {
    path: '/games',
    route: gameRoute,
  },
  {
    path: '/avatars',
    route: avatarsRoute,
  },
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/upload',
    route: uploadRoute,
  },
]

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route)
})

module.exports = router;