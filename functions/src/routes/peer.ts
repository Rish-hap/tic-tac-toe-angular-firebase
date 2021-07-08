import * as express from 'express';

class Peer {
  public router: express.Router;

  constructor() {
    this.router = express.Router()
    this.configRoutes()
  }

  private configRoutes() {
    
    this.router.get('/history', function (req, res) {
      res.send('some response')
    })
  }
}

const PeerRouter = new Peer().router;

export { PeerRouter }