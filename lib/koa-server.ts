import Koa from 'koa';
import bodyparser from 'koa-bodyparser';
import json from 'koa-json';
import onerror from 'koa-onerror';
import staticServer from 'koa-static-server';
import { loggerRes, loggerErr } from './utils/logger.js';
import generalResult from './middleware/generalResult.js';
import apiRouter from './api/index.js';
import path from 'path';
import { setKeyValue } from './dao/interface/Hello.js';

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
    generalResult(ctx);

    loggerRes.info(`<-- ${ctx.method} ${ctx.url} `);
    const start = new Date().getTime();
    await next();
    const ms: number = new Date().getTime() - start;
    loggerRes.info(`--> ${ctx.method} ${ctx.url} - ${ms}ms - ${ctx.status}`);
});

app.use(apiRouter.routes());
// 读取编译后的静态文件
app.use(
    staticServer({
        rootDir: path.resolve('dist'),
        rootPath: '/'
    })
);
// error-handling
app.on('error', (err, ctx) => {
    loggerErr.error('main Error: ', err, ctx);
});

export default app;
