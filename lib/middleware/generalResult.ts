import { resultBean } from '../type/context/result.js';

export function generalResult(ctx) {
    if (ctx.request.method === 'POST' || ctx.path.slice(0, 5) === '/api/') {
        ctx.body = new resultBean({
            code: 100,
            text: ''
        });
    }
}
export default generalResult;
