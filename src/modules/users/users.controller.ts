import { type NextFunction, type Request, type Response } from "express";
import httpStatus from 'http-status-codes'
import { UserService } from "./users.service";
import  catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const CreateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserService.CreateUser(req.body)
    sendResponse(res,{
        status : httpStatus.CREATED,
        success : true,
        message : "User created successfully",
        data : result
    })
})

const getUserProfile = catchAsync(async(req:Request, res: Response, next:NextFunction)=>{
    const result = await UserService.getProfile(req.user!)

    sendResponse(res,{
        status:httpStatus.ACCEPTED,
        success:true,
        message:"User Profile Fetched",
        data:result
    })
})

const updateMyProfile = catchAsync(async(req:Request, res: Response, next:NextFunction)=>{
    console.log(req.user?.id)
    const result = await UserService.updateProfile(req.body,req.user?.email!)
    console.log(result)
    sendResponse(res,{
        status:httpStatus.ACCEPTED,
        success:true,
        message:"User Profile Updated",
        data:result
    })
})
export const UserController = {
    CreateUser,
    getUserProfile,
    updateMyProfile
}