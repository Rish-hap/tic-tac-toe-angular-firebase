import * as express from "express"
const gameRoute = require('./game.route');
const avatarsRoute = require('./avatars.route');


const router = express.Router();

const defaultRoutes = [
  {
    path: '/games',
    route: gameRoute,
  },
  {
    path: '/avatars',
    route: avatarsRoute,
  }
]

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route)
})

module.exports = router;