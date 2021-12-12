import { Router } from "express";
import { OrderController } from '../controllers/OrderController.js'
import checkAuthentication from "../middleware/checkAuthentication.js";
const router = Router();



router.get("/", checkAuthentication, OrderController.getAllOrders)
router.post("/", checkAuthentication, OrderController.addOrder)


export default router;
