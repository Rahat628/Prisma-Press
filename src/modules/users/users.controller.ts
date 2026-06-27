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


// const CreateUser = async (req: Request, res: Response) => {
//     try {
//         const result = await UserService.CreateUser(req.body)
//         res.status(httpStatus.CREATED).json({
//             success: true,
//             message: "User created successfully",
//             data : result
//         })
        
//     }
//     catch (err: any) {
//         res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
//             success: false,
//             message : err.message,
//             error : err
//         })

//     }

// }

export const UserController = {
    CreateUser
}