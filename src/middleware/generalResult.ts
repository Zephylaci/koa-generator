import { resultBean } from "../utils/bean/resultBean";

export function generalResult (ctx){
    ctx.body = new resultBean({
        retCode:1000,
        text:'连接成功'
    });
}
export default generalResult