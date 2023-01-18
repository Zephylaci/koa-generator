// 路由设置
var KoaRouter = require('koa-router')();
var hello = require('../api/hello.js');

KoaRouter.get('/hello', hello.control);

module.exports = KoaRouter;
