import app from '../lib/koa-server.js';
import http from 'http';
import { port, host } from '../config/index.js';
import { loggerRes, logger } from '../lib/utils/logger.js';
import Debug from 'debug';
const debug = Debug('demo:server');

// 打印输出端口号
logger.info(`http listen: ${host}:${port}`);
const server = http.createServer(app.callback());

server.listen(port, host);
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            loggerRes.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            loggerRes.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);
}

export default server;
export { server };
