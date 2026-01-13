// User imports
import constants from "../../../config/constants.ts";
import AppError from "../AppError.ts";

class InternalServerError extends AppError {
    constructor(public readonly message: string) {
        super(message, constants.API_STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
}

export default InternalServerError;
