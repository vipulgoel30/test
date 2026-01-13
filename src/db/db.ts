// Third-party imports
import pgPromise, { type IDatabase, type IMain } from "pg-promise";

// User imports
import logger from "../utils/functions/logger.ts";
import { getErrMessage } from "../utils/utils.ts";
import retry from "../utils/functions/retry.ts";
import constants from "../config/constants.ts";
import messages from "../config/messages.ts";
import DBError from "../utils/errors/DBError.ts";

//////////////////////////////////////////////////////
// PG-PROMISE INIT
//////////////////////////////////////////////////////

const pgp: IMain = pgPromise({
    ...(process.env.NODE_ENV !== constants.ENV.PROD && {
        error: (event) => {
            logger.error(event);
        },
        query: (event) => {
            if (event.query) {
                logger.debug(event.query);
            }
        },
    }),
});



let db: IDatabase<any> | null = null;
let dbConnectingPromise: Promise<IDatabase<any>> | null = null;

//////////////////////////////////////////////////////
// PRIVATE FUNCTION
//////////////////////////////////////////////////////

const initDbConnection = async (): Promise<IDatabase<any>> => {
    // If DB connection already exists
    if (db) return db;

    // If DB connection is initializing
    if (dbConnectingPromise) return dbConnectingPromise;

    return (dbConnectingPromise = retry(
        () =>
            new Promise((resolve, reject) => {
                try {
                    db = pgp({
                        host: process.env.DB_HOST,
                        port: parseInt(process.env.DB_PORT),
                        database: process.env.DB_NAME,
                        user: process.env.DB_USERNAME,
                        password: process.env.DB_PASSWORD,
                    });

                    logger.info(messages.DB.CONNECT_SUCCESS);
                    resolve(db!);
                } catch (err) {
                    reject(
                        new DBError(
                            `${messages.DB.CONNECT_ERROR} ${messages.COMMON.REASON} ${getErrMessage(err)}`
                        )
                    );
                }
            }),
        5,
        10,
        100
    ));
};

//////////////////////////////////////////////////////
// PUBLIC FUNCTIONS
//////////////////////////////////////////////////////

const runQuery = async (
    query: string,
    params: Record<string, any> = {}
): Promise<null> => {
    try {
        const db = await initDbConnection();
        return await db.none(query, params);
    } catch (err) {
        throw new DBError(
            `${messages.DB.CONNECT_ERROR} ${messages.COMMON.REASON} ${getErrMessage(err)}`
        );
    }
};

const getOne = async <Result>(
    query: string,
    params: Record<string, any> = {}
): Promise<Result> => {
    try {
        const db = await initDbConnection();
        return await db.one<Result>(query, params);
    } catch (err) {
        throw new DBError(
            `${messages.DB.CONNECT_ERROR} ${messages.COMMON.REASON} ${getErrMessage(err)}`
        );
    }
};

const getOneOrNone = async <Result>(
    query: string,
    params: Record<string, any> = {}
): Promise<Result | null> => {
    try {
        const db = await initDbConnection();
        return await db.oneOrNone<Result>(query, params);
    } catch (err) {
        throw new DBError(
            `${messages.DB.CONNECT_ERROR} ${messages.COMMON.REASON} ${getErrMessage(err)}`
        );
    }
};

const getMany = async <Result>(
    query: string,
    params: Record<string, any> = {}
): Promise<Result[]> => {
    try {
        const db = await initDbConnection();
        return await db.many<Result>(query, params);
    } catch (err) {
        throw new DBError(
            `${messages.DB.CONNECT_ERROR} ${messages.COMMON.REASON} ${getErrMessage(err)}`
        );
    }
};

const getAny = async <Result>(
    query: string,
    params: Record<string, any> = {}
): Promise<Result[]> => {
    try {
        const db = await initDbConnection();
        return await db.any<Result>(query, params);
    } catch (err) {
        throw new DBError(
            `${messages.DB.CONNECT_ERROR} ${messages.COMMON.REASON} ${getErrMessage(err)}`
        );
    }
};

//////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////

export {
    runQuery,
    getOne,
    getOneOrNone,
    getMany,
    getAny,
};

export default initDbConnection;
