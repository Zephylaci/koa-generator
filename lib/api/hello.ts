import Router from 'koa-router';
import { setKeyValue, getValueFromKey } from '../dao/interface/Hello.js';

const main = new Router();

main.prefix('/hello');

main.get('/get', async (ctx, next) => {
    const params = ctx.query;
    const { key } = params;
    if (typeof key === 'string') {
        const item = await getValueFromKey(key);
        ctx.body = item ? item.value : 'null';
    } else {
        ctx.body = 'Hello World!';
    }
});

main.get('/set', async (ctx, next) => {
    const params = ctx.query;
    const { key, value } = params;
    await setKeyValue({ key, value });
    ctx.body = `set ${key} ${value}`;
});

export default main;
