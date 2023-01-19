import log4js from 'log4js';
import log4jsConfig from '../../config/log-config.js';
//加载配置文件
log4js.configure(log4jsConfig);

export const logger = log4js.getLogger('logger');
export const loggerRes = log4js.getLogger('http');
export const loggerErr = log4js.getLogger('error');
export const loggerShow = log4js.getLogger('stdout');
export const loggerSql = log4js.getLogger('sql');

let logUtil = {
    logger,
    loggerRes,
    loggerErr,
    loggerShow,
    loggerSql
};

export default logUtil;
