import catchAsync from "../../utils/catchAsync";
import { type Request, type Response, type NextFunction } from "express";
import { postService } from "./post.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatusCode from 'http-status-codes'

const CreatePost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const post = await postService.CreatePost(req.body,req.user?.id!)
    sendResponse(res,{
        success:true,
        message:"Post Posted",
        status:httpStatusCode.CREATED,
        data:post
    })
})

export  const postController = {
    CreatePost
}