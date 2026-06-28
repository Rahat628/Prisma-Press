import { Router } from "express";
import authUser from "../middleware/auth_middleware";
import { Role } from "../../../generated/prisma";
import { postController } from "./post.controller";

const router = Router()


router.post('/',authUser(Role.ADMIN,Role.USER),postController.CreatePost)

export const PostRouter = router