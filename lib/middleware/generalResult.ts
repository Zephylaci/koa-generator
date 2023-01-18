import { resultContext } from "../type/context/result.js";

export function generalResult(ctx) {
    if (ctx.request.method === "POST") {
        ctx.body = new resultContext({
            code: 100,
            text: "连接成功",
        });
    }
    if (ctx.request.method === "OPTION") {
        ctx.response.status = 200;
    }
}
export default generalResult;
