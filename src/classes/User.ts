// User imports
import messages from "../config/messages.ts";
import UserSchema from "../db/schema/UserSchema.ts";
import MappingError from "../utils/errors/MappingError.ts";
import { getErrMessage } from "../utils/utils.ts";

class User {
    public id: string;
    public name: string;
    public username: string;
    public email: string;
    public password: string;
    public isVerified: boolean;
    public createdAt: Date;
    public updatedAt: Date;
    public passwordLastModifiedAt: Date;

    constructor(data: UserSchema) {
        try {
            this.id = data?.id;
            this.name = data?.name;
            this.username = data?.user_name;
            this.email = data?.email;
            this.password = data?.password;
            this.isVerified = data?.is_verified === 1;
            this.createdAt = new Date(data?.created_at);
            this.updatedAt = new Date(data?.updated_at);
            this.passwordLastModifiedAt = new Date(data?.password_last_modified_at);



        } catch (err) {
            throw new MappingError(`${messages.USER.ERROR_MAPPING} ${messages.COMMON.REASON} ${getErrMessage(err)}`);
        }
    }

    toJSON() {
        const { password, passwordLastModifiedAt, ...rest } = { ...this };
        return { ...rest };
    }
}

export default User;
