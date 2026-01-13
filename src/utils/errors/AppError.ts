// User imports
import constants from "../../config/constants.ts";
import messages from "../../config/messages.ts";

class AppError extends Error {
    constructor(public readonly message: string, public readonly statusCode: number) {
        super(message);
    }

    static getStatus(statusCode: number): string {
        return statusCode >= constants.API_STATUS_CODE.BAD_REQUEST && statusCode < constants.API_STATUS_CODE.INTERNAL_SERVER_ERROR ? messages.API.FAIL_STATUS : messages.API.ERROR_STATUS;
    }
}

export default AppError;
