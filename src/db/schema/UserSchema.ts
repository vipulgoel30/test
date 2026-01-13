interface UserSchema {
    id: string;
    name: string;
    user_name: string;
    email: string;
    password: string;
    is_verified: number;
    created_at: string;
    updated_at: string;
    password_last_modified_at: string;
}

export default UserSchema;
