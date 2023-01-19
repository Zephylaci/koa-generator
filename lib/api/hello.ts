import Router from 'koa-router';
import { resultBean } from '../type/context/result.js';
import { setKeyValue, getValueFromKey } from '../dao/interface/Hello.js';

const main = new Router();

main.prefix('/hello');

main.get('/get', async (ctx, next) => {
    const res: resultBean = ctx.body;
    const params = ctx.query;
    const { key } = params;

    res.code = 200;
    if (typeof key === 'string') {
        const item = await getValueFromKey(key);
        res.contents = item ? item.value : null;
    } else {
        res.contents = 'Hello World!';
    }
});

main.get('/set', async (ctx, next) => {
    const res: resultBean = ctx.body;
    const params = ctx.query;
    const { key, value } = params;
    await setKeyValue({ key, value });

    res.code = 200;
    res.contents = `set ${key} ${value}`;
});

export default main;
