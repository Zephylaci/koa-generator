import * as router from "koa-router";
const HelloHandle = new router();
HelloHandle.get("/hello", (ctx, next) => {
    ctx.body = "Hello World!";
});

export default HelloHandle;
