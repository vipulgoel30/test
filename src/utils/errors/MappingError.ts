// User imports
import InternalServerError from "./httpErrors/InternalServerError.ts";

class MappingError extends InternalServerError {
    constructor(public readonly message: string) {
        super(message);
    }
}

export default MappingError;
