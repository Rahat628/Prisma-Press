import { type Response } from "express";
interface ResponseData {
    status: number;
    success: boolean;
    message: string;
    data?: any;
    meta?: {
        page?: number;
        limit?: number;
        total?: number;
    };
}




export const sendResponse = (res: Response, data: ResponseData) => {
    res.status(data.status).json({
        success: data.success,
        message: data.message,
        data: data.data,
        meta :{
            page : data.meta?.page,
            limit : data.meta?.limit,
            total : data.meta?.total
        }
    });
};