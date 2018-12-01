import * as Koa from 'koa';
import * as json from'koa-json'
import * as onerror from'koa-onerror'
import * as bodyparser from'koa-bodyparser'
import * as KoaRouterBase from'koa-router'
import * as staticServer from'koa-static-server'
import * as logger from'koa-logger'
import * as path from 'path'
import  apiRouter from'./router/api-routers'

const app = new Koa();
const KoaRouter = KoaRouterBase();

//const apiRouter = require('./router/api-routers');
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(async (ctx, next) => {
  const start = new Date().getTime();
  await next();
  const ms:number = new Date().getTime() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})


KoaRouter.use('/api', apiRouter.routes());
app.use(KoaRouter.routes()); // 将api路由规则挂载到Koa上。
// 读取编译后的静态文件
app.use(staticServer({
  rootDir: path.resolve('dist'),
  rootPath: '/'
})); 
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});
export default app;

