import express from "express";
import * as http from "http"
import cors from 'cors'
import morgan from "morgan"

import routes from './routes/index.js'


export class Server {
    #app
    port = 3000
    httpServer

  constructor() {
    this.app = express()
    this.app.use(cors())
    this.app.use(morgan('dev'))
    this.app.use(express.json()); // support json encoded bodies
    this.app.use(express.urlencoded({ extended: true })) // support encoded bodies
    this.port = 3000
    this.httpServer = http.createServer(this.app)
  }

  setRoutes = () => {
    this.app.use('/api', routes);
  }

  startServer = () => {
    this.httpServer.listen(this.port);
    this.httpServer.on('error', this.onError);
    this.httpServer.on('listening', this.onServerListen);
  }
  
  onError = (err) => {
    switch (err.code) {
      case 'EACCES':
        console.error('port requires elevated privileges');
        process.exit(1);
      case 'EADDRINUSE':
        console.error('port is already in use');
        process.exit(1);
      default:
          console.log(err)
        throw err;
    }
  }

  onServerListen = () => {
    console.log('App listening on port ' + this.port);
    console.log("you are running in " + process.env.NODE_ENV + " mode.");
  }
}