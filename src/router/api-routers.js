// 路由设置
import Router from 'koa-router';
import hello from '../api/hello.js';

const KoaRouter = Router();

KoaRouter.get('/hello', hello.control);

export default KoaRouter;
