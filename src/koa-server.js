import Koa from 'koa';
import json from 'koa-json';
import onerror from 'koa-onerror';
import bodyparser from 'koa-bodyparser';
import Router from 'koa-router';
import apiRouter from './router/api-routers.js';
import KoaStatic from 'koa-static-server';
import path from 'path';

const KoaRouter = Router();
const app = new Koa();

onerror(app);

// middlewares
app.use(
    bodyparser({
        enableTypes: ['json', 'form', 'text']
    })
);
app.use(json());

app.use(async (ctx, next) => {
    const start = new Date();
    console.log(`<-- ${ctx.method} ${ctx.url}`);
    try {
        await next();
    } catch (error) {
        console.log('check error:', error);
        ctx.status = error.status || error.statusCode || 500;
        ctx.body = error.message || 'Error!';
    }
    const ms = new Date() - start;
    console.log(`--> ${ctx.method} ${ctx.url} - ${ms}ms`);
});

KoaRouter.use('/api', apiRouter.routes());
app.use(KoaRouter.routes()); // 将api路由规则挂载到Koa上。
// 读取编译后的静态文件
app.use(
    KoaStatic({
        rootDir: path.resolve('dist'),
        rootPath: '/'
    })
);

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx);
});

export default app;
