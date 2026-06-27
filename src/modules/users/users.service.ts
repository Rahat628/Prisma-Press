import { prisma } from "../../lib/prisma";
import config from "../../config";
import bcrypt from "bcrypt";
import type { IUser } from "./user.interface";





const CreateUser = async (payload: IUser) => {
    const { name, email, password, profilePhoto } = payload;
    const hashPassword = await bcrypt.hash(password, Number(config.saltRounds));
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashPassword,
            profile:{
                create : {
                    profilePhoto
                }
            }
        },
        
        omit: {
            password: true
        }
    })
    if (!user) {
        throw new Error("User not created")
    }

    const createdUser = await prisma.user.findUnique({
        where : {
            Id : user.Id
        },
        include : {
            profile : true
        }
    })
    if(!createdUser){
        throw new Error("Created User not found")
    }
    return createdUser
    
}

export const UserService = {
    CreateUser
}