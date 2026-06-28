import { Router } from "express";
import { UserController } from "./users.controller";
import authUser from "../middleware/auth_middleware";
import { Role } from "../../../generated/prisma";



const router = Router()

router.post('/register',UserController.CreateUser);
router.get('/me',authUser(Role.ADMIN,Role.USER),UserController.getUserProfile)
router.put('/my-profile',authUser(Role.ADMIN,Role.USER),UserController.updateMyProfile)

export const UserRouter = router;