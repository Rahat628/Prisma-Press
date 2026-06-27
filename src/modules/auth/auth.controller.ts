import {  type NextFunction, type Request,  type Response } from "express";
import { authService } from "./auth.service";
import httpStatus from 'http-status-codes'
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";



const userLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await authService.loginUser(req.body)
    res.cookie('refreshToken', result.refreshToken, {
        httpOnly : true,
        secure : false,
        maxAge : 7 *24 * 60 * 60 * 1000 // 7 day
    })

    res.cookie('accessToken', result.accessToken, {
        httpOnly : true,
        secure : false,
        maxAge : 60 * 60 * 1000 // 1 hour
    })

    sendResponse(res,{
        status : httpStatus.OK,
        success : true,
        message : "User logged in successfully",
        data : result
    })
})



export const authController = {
    userLogin
};