// 路由设置
import Router from "koa-router";
import hello from "./hello.js";

const apiRouter = new Router();

apiRouter.prefix("/api");
apiRouter.use(hello.routes());

export default apiRouter;
