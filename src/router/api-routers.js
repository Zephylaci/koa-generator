// 路由设置
var KoaRouter = require('koa-router')();
var hello = require('../api/hello.js');

KoaRouter.get('/hello',hello.contrl) //getNhData接受post调用


module.exports = KoaRouter;