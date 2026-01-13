// Core imports
import { createServer } from "https";
import { readFile } from "fs/promises";

// User imports
import app from "./app.ts";
import logger from "./utils/functions/logger.ts";
import { formatStr, getDirname, getErrMessage } from "./utils/utils.ts";
import initDbConnection, { getAny, getMany, getOne, getOneOrNone, runQuery } from "./db/db.ts";
import { join } from "path";
import messages from "./config/messages.ts";
import z from "zod";
import initTables from "./db/initTables.ts";

// Safety nets catching all kind of errors
const FATAL_ERRORS = ["uncaughtException", "unhandledRejection"] as const;
FATAL_ERRORS.forEach((errType: (typeof FATAL_ERRORS)[number]) => {
    process.on(errType, (err) => {
        // Logging the error
        logger?.error(`${errType.toUpperCase()} ${messages.COMMON.REASON} ${getErrMessage(err)}`);

        // Also console.error in case logging is not successful
        console.error(`${errType.toUpperCase()} ${messages.COMMON.REASON} ${getErrMessage(err)}`);

        // Exiting the application with not-success status code
        process.exitCode = 1;
    });
});



const testDbFunctions = async () => {
    console.log("---- RUN QUERY (INSERT) ----");

    await runQuery(
        `
    CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  age INT,
  created_at TIMESTAMP DEFAULT NOW()
);

    `,
    );

    await runQuery(
        `
    INSERT INTO users (name, email, age)
    VALUES ($1, $2, $3)
    `,
        ["Vipul", "vipul@test.com", 24]
    );

    console.log("Insert successful\n");

    // --------------------------------------

    console.log("---- GET ONE ----");

    const user = await getOne<{
        id: number;
        name: string;
        email: string;
        age: number;
    }>(
        `
    SELECT id, name, email, age
    FROM users
    WHERE email = $1
    `,
        ["vipul@test.com"]
    );

    console.log(user, "\n");

    // --------------------------------------

    console.log("---- GET ONE OR NONE (FOUND) ----");

    const foundUser = await getOneOrNone<{ id: number; name: string }>(
        `
    SELECT id, name
    FROM users
    WHERE email = $1
    `,
        ["vipul@test.com"]
    );

    console.log(foundUser, "\n");

    // --------------------------------------

    console.log("---- GET ONE OR NONE (NOT FOUND) ----");

    const missingUser = await getOneOrNone(
        `
    SELECT id
    FROM users
    WHERE email = $1
    `,
        ["missing@test.com"]
    );

    console.log(missingUser); // null
    console.log();

    // --------------------------------------

    console.log("---- GET MANY ----");

    const users = await getMany<{ id: number; name: string }>(
        `
    SELECT id, name
    FROM users
    WHERE age > $1
    `,
        [18]
    );

    console.log(users, "\n");

    // --------------------------------------

    console.log("---- GET ANY ----");

    const anyUsers = await getAny<{ id: number; name: string }>(
        `
    SELECT id, name
    FROM users
    WHERE age > $1
    `,
        [100] // no rows
    );

    console.log(anyUsers); // []
    console.log();

    // --------------------------------------

    console.log("---- RUN QUERY (UPDATE) ----");

    await runQuery(
        `
    UPDATE users
    SET age = age + 1
    WHERE email = $1
    `,
        ["vipul@test.com"]
    );

    console.log("Update successful\n");

    // --------------------------------------

    console.log("---- CLEANUP ----");

    await runQuery(
        `
    DELETE FROM users
    WHERE email = $1
    `,
        ["vipul@test.com"]
    );

    console.log("Cleanup done");
};

testDbFunctions()
    .then(() => {
        console.log("\n✅ All DB tests passed");
        process.exit(0);
    })
    .catch((err) => {
        console.error("\n❌ DB test failed");
        console.error(err);
        process.exit(1);
    });


const initServer = async () => {
    try {
        // Checking if port value is available
        const port = parseInt(process.env.PORT);
        if (Number.isNaN(port)) {
            throw new Error(messages.SERVER.INVALID_PORT);
        }



        // Connecting to DB
        initDbConnection();

        // Initializing server
        // createServer(
        //     {
        //         cert: await readFile(join(getDirname(import.meta.url), "../server.crt"), "utf-8"),
        //         key: await readFile(join(getDirname(import.meta.url), "../server.key"), "utf-8"),
        //         requestCert: false,
        //         rejectUnauthorized: false,
        //     },
        //     app
        // ).listen(port, process.env.IP, () => {
        //     logger.info(`App listening on : ${process.env.IP}:${process.env.PORT}`);
        // });

        const result = await runQuery(`CREATE TABLE IF NOT EXISTS user_table(
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        user_name TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE ,
        password TEXT NOT NULL,
        role INT NOT NULL,
        department INT NOT NULL,
        is_verified INTEGER NOT NULL,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        password_last_modified_at TEXT NOT NULL)`)

        console.log(result);

        app.listen(port, process.env.IP, () => {
            logger.info(formatStr(messages.SERVER.START_SUCCESS, process.env.IP, port));
        });

        // Initializing DB tables
        await initTables();


    } catch (err) {
        logger.error(`${messages.SERVER.INIT_ERROR} ${messages.COMMON.REASON} ${getErrMessage(err)}`);
        process.exitCode = 1;
    }
};

initServer();
