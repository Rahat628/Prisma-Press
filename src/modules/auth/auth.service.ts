import { prisma } from "../../lib/prisma";
import bcrypt from 'bcrypt'
import jwt, { type JwtPayload, type SignOptions } from 'jsonwebtoken'
import config from "../../config";
import type { NextFunction } from "express";
import { type Request, type Response } from "express";
import type { Role } from "../../../generated/prisma";



const authUser = async( req: Request, next: NextFunction, requiredRoles : Role[] )=>{
    const {accessToken} = req.cookies;
    const decoded = jwt.verify(accessToken,config.jwtAccessSecret as string)
    if(typeof decoded ==='string' ){
        throw new Error("Invalid token")
    }
    if(!(decoded.Role in requiredRoles)){
        throw new Error('Unauthorized')
    }

    console.log(decoded.id,decoded.name)

    next()
}


const loginUser = async(payload : any)=>{
    const { email , password } = payload;
    const user = await prisma.user.findUniqueOrThrow({
        where: {email}
    })
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if(!isPasswordValid){
        throw new Error("Invalid password")
    }
    // generate jwt tokens

    const jwtPayload = {
        id: user.Id,
        name : user.name,
        email: user.email,
        role : user.role
    } as JwtPayload

    const accessToken = jwt.sign(jwtPayload, config.jwtAccessSecret as string,
         {expiresIn : config.jwtAccessExpiresIn } as SignOptions)
    const refreshToken = jwt.sign(jwtPayload, config.jwtRefreshSecret as string, 
        {expiresIn : config.jwtRefreshExpiresIn } as SignOptions)
    return {
        accessToken,
        refreshToken
    }

}
export const authService = {
    loginUser
}