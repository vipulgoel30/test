export default {
    API: {
        TOO_MANY_REQUESTS: "Too many requests, please try again later.",
        INTERNAL_SERVER_ERROR_MESSAGE: "Uhh!!! Something went wrong on the server.",
        NOT_FOUND_ERROR_MESSAGE: "The requested endpoint '{endpoint}' does not exist for method '{method}'.",
        ERROR_STATUS: "Error",
        FAIL_STATUS: "Fail",
    },

    LOG: {
        INCORRECT_LOG_LEVEL: "Invalid log level '{level}' in .env file.",
    },

    TITLE: {
        NOT_FOUND: "Executor - Not Found", // TODO change application name
    },

    BCRYPT: {
        HASHING_ERROR: "Error occurred while hashing or verifying the password.",
    },

    COMMON: {
        REASON: "Reason :",
    },

    JWT: {
        SIGN_ERROR: "Error occurred while signing the JWT.",
        VERIFY_ERROR: "Error occurred while verifying the JWT.",
        INVALID_TOKEN: "Authentication token is invalid or expired.",
    },

    USER: {
        ERROR_MAPPING: "An error occurred while mapping database 'user' data to the 'User' model.",
    },

    SERVER: {
        INVALID_PORT: "Invalid server port configuration.",
        INIT_ERROR: "Failed to initialize the server.",
        START_SUCCESS: "App listening on : {ip}:{port}"
    },


    INIT_TABLES: {
        INIT_TABLE_CREATION: "Initializing '{table}'.",
        SUCCESS_TABLE_CREATION: "Successfully initialized '{table}'.",
        ERROR: "Error occurred while initializing database tables.",
    },
    DB: {
        CONNECT_SUCCESS: "DB connected successfully.",
        CONNECT_ERROR: "Error occured while connecting with DB.",
    },

    FILE: {
        NOT_FOUND: "No file found at the specified path: '{path}'.",
        ERROR_READING: "An error occurred while reading the file at path: '{path}'.",
    },
} as const;
