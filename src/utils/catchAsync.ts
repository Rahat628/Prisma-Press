import { type NextFunction, type Request, type RequestHandler, type Response } from "express";
import httpStatus from 'http-status-codes'
import { sendResponse } from "./sendResponse";


const catchAsync = (fn: RequestHandler) => {
    return async(req: Request, res: Response, next: NextFunction) => {
        try{
            await fn(req,res,next)
        }
        catch(err : any){
            sendResponse(res,{
                status : httpStatus.INTERNAL_SERVER_ERROR,
                success : false,
                message : err.message || "Something went wrong",
                data : err
            })

        }

    }
}
export default catchAsync