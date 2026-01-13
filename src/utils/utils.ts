// Core imports
import { existsSync } from "fs";
import { inspect } from "util";
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import messages from "../config/messages.ts";

const getErrMessage = (error: unknown): string => {
    if (error instanceof Error) {
        return inspect(error);
    }

    return error?.toString?.() ?? "";
};

const formatStr = (str: string, ...placeholders: any[]) => {
    let index: number = 0;
    const length = placeholders.length;

    return str.replace(new RegExp(/{[\w]*}/, "ig"), (match, _) => {
        return index < length ? placeholders[index++] : match;
    });
};

const readFileAsync = async (path: string): Promise<string> => {
    try {
        // Checking whether file exists or not
        if (!existsSync(path)) throw new Error(formatStr(messages.FILE.ERROR_READING, path));

        return await readFile(path, "utf-8");
    } catch (err) {
        throw new Error(
            `${formatStr(messages.FILE.ERROR_READING, path)} ${messages.COMMON.REASON} ${getErrMessage(err)}`
        );
    }
};

const getFileName = (url: string): string => {
    return fileURLToPath(url);
};

const getDirname = (url: string): string => {
    return fileURLToPath(new URL(".", url));
};

export { getErrMessage, formatStr, readFileAsync, getFileName, getDirname };
