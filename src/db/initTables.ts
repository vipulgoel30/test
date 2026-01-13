// User imports
import messages from "../config/messages.ts";
import DBError from "../utils/errors/DBError.ts";
import logger from "../utils/functions/logger.ts";
import { formatStr, getErrMessage } from "../utils/utils.ts";
import { runQuery } from "./db.ts";

const createTableQueries: { query: string; name: string }[] = [
    // { query: userQueries.create, name: USER_TABLE_NAME },
    // { query: emailVerificationQueries.create, name: EMAIL_VERIFICATION_TABLE_NAME },
    // { query: boardQueries.create, name: BOARD_TABLE_NAME },
    // { query: taskQueries.create, name: TASK_TABLE_NAME },
];

const initTables = async () => {
    try {
        await Promise.all(
            createTableQueries.map(async ({ query, name }) => {
                logger.info(formatStr(messages.INIT_TABLES.INIT_TABLE_CREATION, name));
                await runQuery(query);
                logger.info(formatStr(messages.INIT_TABLES.SUCCESS_TABLE_CREATION, name));
            })
        );
    } catch (err) {
        throw new DBError(`${messages.INIT_TABLES.ERROR} ${messages.COMMON.REASON} ${getErrMessage(err)}`);
    }
};

export default initTables;
