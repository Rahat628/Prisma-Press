import { prisma } from "../../lib/prisma";
import config from "../../config";
import bcrypt from "bcrypt";

const CreateUser = async (payload: any) => {
    const { name, email, password, ProfilePhoto } = payload;
    const hashPassword = await bcrypt.hash(password, Number(config.saltRounds));
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashPassword
        },
        omit: {
            password: true
        }
    })
    if (!user) {
        throw new Error("User not created")
    }
    await prisma.profile.create({
        data: {
            userId: user.Id,
            ProfilePhoto
        }
    })
    const createdUser = await prisma.user.findUnique({
        where : {
            Id : user.Id
        },
        include : {
            profile : true
        }
    })
    return createdUser;
}

export const UserService = {
    CreateUser
}