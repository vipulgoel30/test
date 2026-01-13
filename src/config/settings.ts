export default {
    RATE_LIMIT: {
        WINDOW_MS: 15 * 60 * 1000,
        LIMIT: 10000,
    },

    // BCRYPT
    BCRYPT: {
        SALT_ROUNDS: 10,
    },

    JWT: {
        ALGORITHM: "HS256",
        SECRET_TOKEN: "thisisjwttokenthisisjwttoken",
    },

    // Log file settings
    LOG: {
        DEFAULT_LEVEL: "debug",
        DIRECTORY: "./log",
        IS_ZIP_ARCHIVE: true,
        DATE_PATTERN: "YYYY-MM-DD",
        FILENAME: "tasker-%DATE%",
        FILENAME_EXTENSION: ".log",
        MAX_FILE: 10,
        MAX_SIZE: "5m",
    },

    // Retry operation default values
    RETRY: {
        COUNT: 3,
        INTERVAL: 100,
        MAX_INTERVAL: 500,
    },

}