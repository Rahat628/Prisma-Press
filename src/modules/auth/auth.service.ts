import { prisma } from "../../lib/prisma";
import bcrypt from 'bcrypt'
import jwt, { type SignOptions } from 'jsonwebtoken'
import config from "../../config";
import { jwtUtils } from '../../utils/jwt'



const loginUser = async (payload: any) => {
    const { email, password } = payload;
    const user = await prisma.user.findUniqueOrThrow({
        where: { email }
    })
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        throw new Error("Invalid password")
    }

    if (user.activeStatus === 'BLOCKED') {
        throw new Error("User is inactive")
    }
    // generate jwt tokens

    const jwtPayload = {
        id: user.Id,
        name: user.name,
        email: user.email,
        role: user.role
    }

    const accessToken = jwtUtils.jwtSign(jwtPayload, config.jwtAccessSecret as string, config.jwtAccessExpiresIn as SignOptions)

    const refreshToken = jwtUtils.jwtSign(jwtPayload, config.jwtRefreshSecret as string, config.jwtRefreshExpiresIn as SignOptions)

    return {
        accessToken,
        refreshToken
    }

}

const newAccessToken = (refreshToken: string) => {
    const decoded = jwtUtils.jwtVerify(refreshToken, config.jwtRefreshSecret as string)
    if (typeof decoded === "string") {
        throw new Error('Refresh-Token is Unverified')
    }
    const JwtPayload = {
        id: decoded.Id,
        name: decoded.name,
        email: decoded.email,
        role: decoded.role
    }
    const accessToken = jwt.sign(JwtPayload, config.jwtAccessSecret as string,
        { expiresIn: config.jwtAccessExpiresIn } as SignOptions)
    return accessToken
}

export const authService = {
    loginUser,
    newAccessToken
}