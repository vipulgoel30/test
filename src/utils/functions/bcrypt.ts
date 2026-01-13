// Third party imports
import { compare, hash } from "bcrypt";

// User imports
import { getErrMessage } from "../utils.ts";
import settings from "../../config/settings.ts";
import InternalServerError from "../errors/httpErrors/InternalServerError.ts";
import messages from "../../config/messages.ts";

// Checking if bcrypt salt rounds available
// in .env file
const bcryptSaltRounds: number = settings.BCRYPT.SALT_ROUNDS;

/**
 * @description Hash the payload using bcrypt
 */
const hashBcrypt = async (payload: string): Promise<string> => {
    try {
        const hashedPayload = await hash(payload, bcryptSaltRounds);
        return hashedPayload;
    } catch (err) {
        throw new InternalServerError(
            `${messages.BCRYPT.HASHING_ERROR} ${messages.COMMON.REASON} ${getErrMessage(err)}`
        );
    }
};

/**
 * @description Compares the hashed password and original password
 */
const compareBcrypt = async (originalPayload: string, hashedPayload: string): Promise<boolean> => {
    try {
        return await compare(originalPayload, hashedPayload);
    } catch (err) {
        throw new InternalServerError(
            `${messages.BCRYPT.HASHING_ERROR} ${messages.COMMON.REASON} ${getErrMessage(err)}`
        );
    }
};

export { hashBcrypt, compareBcrypt };
