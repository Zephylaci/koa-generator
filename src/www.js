import app from './koa-server.js';
import Debug from 'debug';
import http from 'http';
import env from '../config/koa-config.js';

const debug = Debug('demo:server');

//引入配置文件

// 将端口号设置为配置文件的端口号，默认值为3000,dev,test默认端口3001
const port = env.port || '3000';
// 打印输出端口号
console.log('listen prot: ' + env.port);

const server = http.createServer(app.callback());

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
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
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);
}

export default server;
