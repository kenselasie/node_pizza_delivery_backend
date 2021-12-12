import { Server } from './server.js'
import mongoose from "mongoose"
import dotenv from "dotenv"

const server = new Server()
dotenv.config()
mongoose
    .connect('mongodb://localhost/pizza_delivery', {
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    })
    .then(() => console.log('You are now connected to the pizza_delivery Database!'))
    .catch(err => console.error('Something went wrong connecting to the database', err))

server.setRoutes()
server.startServer()

export default server.app