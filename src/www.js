
var app = require('./koa-server.js');
var debug = require('debug')('demo:server');
var http = require('http');

//引入配置文件
var env = require('../config/koa-config.js');
// 将端口号设置为配置文件的端口号，默认值为3000,dev,test默认端口3001
var port = env.port || '3000';
// 打印输出端口号
console.log('listen prot: ' + env.port);


var server = http.createServer(app.callback());


server.listen(port);
server.on('error', onError);
server.on('listening', onListening);



function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

module.exports=server;