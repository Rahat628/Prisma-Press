import type { Request, NextFunction, Response } from "express";
import config from "../../config";
import type { Role } from "../../../generated/prisma";
import { prisma } from "../../lib/prisma";
import catchAsync from "../../utils/catchAsync";
import { jwtUtils } from '../../utils/jwt'



// i don't know why this isn't working yet


const authUser = (...requiredRoles: Role[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        // const { accessToken } = req.cookies;
        let token = req.cookies.accessToken;

        if (!token && req.headers.authorization?.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        }
        if (!token) {
            throw new Error("User not logged in")
        }

        const decoded = jwtUtils.jwtVerify(token, config.jwtAccessSecret as string)
        if (typeof decoded === 'string') {
            throw new Error("Invalid token")
        }
        const { id, name, email, role } = decoded

        if (!(requiredRoles.length !== 0 && requiredRoles.includes(decoded.role))) {
            throw new Error('Unauthorized User')
        }

        // problem with id
        const user = await prisma.user.findUnique({
            where: {
                Id: id,
                email,
                name,
                role
            }
        })
        if (!user) {
            throw new Error("User not found")
        }
        if (user.activeStatus === 'BLOCKED') {
            throw new Error("User is inactive")
        }

        req.user = {
            id: decoded.id,
            name: decoded.name,
            email: decoded.email,
            Role: decoded.role
        }

        console.log(req.user)
        next()
    }
    )
}
export default authUser