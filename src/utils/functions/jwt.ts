// Third party imports
import { sign, verify } from "jsonwebtoken";
import { type Algorithm, JwtPayload } from "jsonwebtoken";

// User imports
import { getErrMessage } from "../utils.ts";
import AppError from "../errors/AppError.ts";
import InternalServerError from "../errors/httpErrors/InternalServerError.ts";
import settings from "../../config/settings.ts";
import messages from "../../config/messages.ts";

const algorithm: Algorithm = "HS256";
const secret: string = settings.JWT.SECRET_TOKEN;

interface JwtSignPayload {
    id: string;
}

type JwtVerifyOutput = JwtSignPayload & JwtPayload;

const jwtSign = async (payload: JwtSignPayload, expiryInS: number): Promise<string> => {
    try {
        const token = await new Promise<string>((resolve, reject) => {
            sign(payload, secret, { algorithm: "HS256", expiresIn: expiryInS }, (error, encoded) => {
                if (error || !encoded) return reject(error);
                resolve(encoded);
            });
        });
        return token;
    } catch (err) {
        throw new InternalServerError(`${messages.JWT.SIGN_ERROR} ${messages.COMMON.REASON} ${getErrMessage(err)}`);
    }
};

const jwtVerify = async (token: string): Promise<JwtVerifyOutput> => {
    try {
        const jwtOutput = await new Promise<JwtPayload>((resolve, reject) =>
            verify(token, secret, { algorithms: [algorithm] }, (error, decoded) => {
                if (error || !decoded || typeof decoded === "string") return reject(error);
                resolve(decoded);
            })
        );

        return jwtOutput as JwtVerifyOutput;
    } catch (err) {
        throw new AppError(messages.JWT.INVALID_TOKEN, 401);
    }
};

export { jwtSign, jwtVerify, type JwtSignPayload, JwtVerifyOutput };
