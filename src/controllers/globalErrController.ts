// Third party imports
import { type Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

// User imports
import constants from "../config/constants.ts";
import messages from "../config/messages.ts";
import AppError from "../utils/errors/AppError.ts";
import InternalServerError from "../utils/errors/httpErrors/InternalServerError.ts";

const handleZodError = (err: ZodError) => ({
    message: err.issues.map((issue) => issue.message),
    statusCode: constants.API_STATUS_CODE.BAD_REQUEST,
});

export default (err: any, req: Request, res: Response, next: NextFunction) => {
    let message: string | string[] = messages.API.INTERNAL_SERVER_ERROR_MESSAGE;
    let statusCode: number = constants.API_STATUS_CODE.INTERNAL_SERVER_ERROR;

    if (err instanceof AppError) {
        if (!(err instanceof InternalServerError)) {
            message = err.message;
        }

        statusCode = err.statusCode;
    } else if (err instanceof ZodError) {
        ({ message, statusCode } = handleZodError(err));
    }

    res.status(statusCode).json({
        status: AppError.getStatus(statusCode),
        message,
    });
};
