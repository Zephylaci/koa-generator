// 路由设置
import * as KoaRouterBase from'koa-router'
import hello from '../api/hello';

const KoaRouter = KoaRouterBase();
KoaRouter.get('/hello',hello.contrl) //getNhData接受post调用

export default KoaRouter