import { Router } from "express"
import userRoutes from './users.routes.js'
import orderRoutes from './order.routes.js'
import menuRoutes from './menu.routes.js'

const routes = Router();


routes.use('/user', userRoutes)
routes.use('/order', orderRoutes)
routes.use('/menu', menuRoutes)

export default routes;