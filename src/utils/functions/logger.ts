// Third party imports
import winston, { log } from "winston";
import "winston-daily-rotate-file";

// User imports

import { formatStr } from "../utils.ts";
import messages from "../../config/messages.ts";
import settings from "../../config/settings.ts";
import constants from "../../config/constants.ts";

const logLevel: string = process.env.LOG_LEVEL;

// Checking if the log level is specified correctly or not
// other wise fallback to default log level
if (!Object.keys(winston.config.npm.levels).includes(logLevel)) {
    setTimeout(() => { }, 2000);
    throw new Error(formatStr(messages.LOG.INCORRECT_LOG_LEVEL, logLevel));
}

/**
 * @description Formats the date in the format YYYY-MM-DD;HH:mm:ss.SSS
 * @param date
 * @returns Formatted string
 */
const formatDate = (date: Date) => {
    // Adds the padding to numbers if
    // length is less than expected one
    const pad = (num: number, length = 2) => new String(num).padStart(length, "0");

    return `${date.getUTCFullYear()}-${pad(date.getMonth())}-${pad(date.getDate())};${pad(date.getHours())}:${pad(
        date.getMinutes()
    )}:${pad(date.getSeconds())}.${pad(date.getMilliseconds(), 3)}`;
};

// Configuring file transport for saving logs
const fileTransport = new winston.transports.DailyRotateFile({
    dirname: settings.LOG.DIRECTORY,
    zippedArchive: settings.LOG.IS_ZIP_ARCHIVE,
    extension: settings.LOG.FILENAME_EXTENSION,
    filename: settings.LOG.FILENAME,
    datePattern: settings.LOG.DATE_PATTERN,
    maxFiles: settings.LOG.MAX_FILE,
    maxSize: settings.LOG.MAX_SIZE,
});

const logger = winston.createLogger({
    level: logLevel,
    format: winston.format.combine(
        winston.format.timestamp({
            format: () => formatDate(new Date()),
        }),
        winston.format.printf(({ level, message, timestamp }) => `${timestamp};${level.toUpperCase()};${message}`)
    ),
    transports: [fileTransport],
});

// For development environment also adding logs to console
if (process.env.NODE_ENV === constants.ENV.DEV) {
    logger.add(new winston.transports.Console());
}

export default logger;
