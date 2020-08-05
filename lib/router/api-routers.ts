// 路由设置
import * as router from "koa-router";
import hello from "../api/helloControl";

const apiRouter = new router();

apiRouter.prefix("/api");
apiRouter.use(hello.routes());

export default apiRouter;
