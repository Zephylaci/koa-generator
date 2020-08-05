import * as router from "koa-router";
import { loggerErr } from "../utils/logger";
import { createErrorMessage } from "../utils/utils";
const HelloHandle = new router();
HelloHandle.get("/hello", (ctx, next) => {
    ctx.body = "Hello World!";

    const ErrorMessage = new Error(
        createErrorMessage({
            from: "Hello",
            type: "O",
            text: "Hello failed!",
        })
    );
    loggerErr.error(ErrorMessage);
});

export default HelloHandle;
