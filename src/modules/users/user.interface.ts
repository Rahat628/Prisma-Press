import type { Role } from "../../../generated/prisma";

export interface IUser {
    id: string;
    name : string;
    email : string;
    password : string;
    profilePhoto? : string;
}

export interface IRequestUser {
    id:string;
    name:string;
    email:string;
    Role:Role
}