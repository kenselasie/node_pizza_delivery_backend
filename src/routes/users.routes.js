import { Router } from "express";
import { UserController } from '../controllers/UserController.js'
const router = Router();



router.get("/", UserController.getAllUsers)
router.post("/", UserController.addUser)
router.post("/login", UserController.userLogin)
router.get("/logout", UserController.userLogout)
router.get("/:id", UserController.getUserById)
router.patch("/:id", UserController.updateUserById)
router.delete("/:id", UserController.deleteUserById)


export default router;
