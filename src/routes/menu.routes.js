import { Router } from "express";
import { MenuController } from '../controllers/MenuController.js'
import checkAuthentication from "../middleware/checkAuthentication.js";

const router = Router();



router.get("/", checkAuthentication, MenuController.getAllMenu)
router.post("/", checkAuthentication,  MenuController.addMenu)


export default router;
