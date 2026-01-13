// User imports
import InternalServerError from "./httpErrors/InternalServerError.ts";

class DBError extends InternalServerError {
    constructor(public readonly message: string) {
        super(message);
    }
}

export default DBError;
