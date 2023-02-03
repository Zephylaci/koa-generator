import Router from 'koa-router';
import { resultBean } from '../type/context/result.js';

const main = new Router();

main.prefix('/hello');

main.get('/get', async (ctx, next) => {
    const res: resultBean = ctx.body;
    const params = ctx.query;
    const { key } = params;

    res.code = 200;
    res.contents = `Hello! ${key || ''}`;
});

export default main;
