import * as Koa from "koa";
import * as bodyparser from "koa-bodyparser";
import * as json from "koa-json";
import * as onerror from "koa-onerror";
import * as KoaRouterBase from "koa-router";
import * as staticServer from "koa-static-server";
import * as path from "path";
import apiRouter from "./router/api-routers";
import { loggerRes, loggerErr } from "./utils/logger";
import generalResult from "./middleware/generalResult";

const app = new Koa();
const KoaRouter = KoaRouterBase();

onerror(app);

// middlewares
app.use(
    bodyparser({
        enableTypes: ["json", "form", "text"],
    })
);
app.use(json());

app.use(async (ctx, next) => {
    generalResult(ctx);
    const start = new Date().getTime();
    await next();
    const ms: number = new Date().getTime() - start;
    loggerRes.info(`${ctx.method} ${ctx.url} - ${ms}ms - ${ctx.status}`);
});

KoaRouter.use("/api", apiRouter.routes());
app.use(KoaRouter.routes()); // 将api路由规则挂载到Koa上。
// 读取编译后的静态文件
app.use(
    staticServer({
        rootDir: path.resolve("dist"),
        rootPath: "/",
    })
);
// error-handling
app.on("error", (err, ctx) => {
    loggerErr.error("main Error: ", err, ctx);
});
export default app;
