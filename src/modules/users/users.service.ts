import { prisma } from "../../lib/prisma";
import config from "../../config";
import bcrypt from "bcrypt";
import type { IRequestUser, IUser } from "./user.interface";
import { error } from "console";



const getProfile = async (payload: IRequestUser) => {

    const { email } = payload
    const result = await prisma.user.findUniqueOrThrow({
        where: { email },
        omit: { password: true },
        include: { profile: true }
    })
    return result
}


const CreateUser = async (payload: IUser) => {
    const { name, email, password, profilePhoto } = payload;
    const hashPassword = await bcrypt.hash(password, Number(config.saltRounds));
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashPassword,
            profile: {
                create: {
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
        where: {
            Id: user.Id
        },
        include: {
            profile: true
        }
    })
    if (!createdUser) {
        throw new Error("Created User not found")
    }
    return createdUser

}

const updateProfile = async(payload: any, userEmail : string) => {
    const {name,profilePhoto,bio} = payload

    const result = await prisma.user.update({
        where:{email:userEmail},
        data:{
            name:name,
            profile:{
                update:{
                    ProfilePhoto:profilePhoto,
                    bio:bio
                }
            }
        },
        omit:{password:true},
        include:{profile:true}
    })
    return result

}


export const UserService = {
    CreateUser,
    getProfile,
    updateProfile
}