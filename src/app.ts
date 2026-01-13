// Core imports
import { join } from "path";

// Third party imports
import express, { type Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import rateLimit from "express-rate-limit";

// User imports
import settings from "./config/settings.ts";
import AppError from "./utils/errors/AppError.ts";
import constants from "./config/constants.ts";
import messages from "./config/messages.ts";
import { formatStr, getDirname } from "./utils/utils.ts";
import globalErrController from "./controllers/globalErrController.ts";


const app = express();

// express-rate-limit : limiting the no of request reaching from certain IP
app.use(
    rateLimit({
        windowMs: settings.RATE_LIMIT.WINDOW_MS,
        limit: settings.RATE_LIMIT.LIMIT,
        message: {
            status: AppError.getStatus(constants.API_STATUS_CODE.TOO_MANY_REQUESTS),
            message: messages.API.TOO_MANY_REQUESTS,
        },
    })
);

app.use(cors());

// Parse the incoming payload if the content-type:application/json is set
app.use(express.json());

// Configuring the view engine
app.set("view engine", "pug");
app.set("views", [join(getDirname(import.meta.url), "../views"), join(getDirname(import.meta.url), "../views/components")]);

// static resources
app.use(express.static(join(getDirname(import.meta.url), "../public")));

// parsing the cookie header
app.use(cookieParser());

app.use((req,res,next)=>{
    return res.render("")
})


// app.use(authRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
    const isApiRoute = req.originalUrl.toUpperCase().startsWith("/API");

    if (isApiRoute) {
        return res.status(constants.API_STATUS_CODE.NOT_FOUND).json({
            status: AppError.getStatus(constants.API_STATUS_CODE.NOT_FOUND),
            message: formatStr(messages.API.NOT_FOUND_ERROR_MESSAGE, req.originalUrl, req.method),
        });
    }

    return res.render("pages/notfound", {
        title: messages.TITLE.NOT_FOUND,
    });
});

//Global error controller
app.use(globalErrController);

export default app;
