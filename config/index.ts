/**
 * 整体配置
 * @param {number} port - koa 监听的端口.
 * @param {object} log -  日志整体设置.
 * @param {string} log.basePath -  日志根目录.
 * @param {string} log.level - 日志的等级
 * log.level = debug 输出所有日志在控制台
 * log.level = watching 输出日志在控制台将必要日志写入日志文件
 * log.level = running 只将必要的日志写入日志文件
 */
const Base = {
    host: '0.0.0.0',
    port: 8082,
    dbAddress: '../db/production.db',
    dbLog: true,
    dbReBuild: false,
    logConfig: {
        basePath: '../logs',
        level: 'watching' // debug watching  running
    }
};
export const viewDir = '../view';

//开发模式的配置
if (process.env.NODE_ENV === 'development') {
    Base.logConfig.level = 'debug';
    Base.dbAddress = './db/development.db';
    Base.dbLog = true;
    // 重新建库 只推荐在开发时需要调试建表时使用
    Base.dbReBuild = false;
}

export const { port, host, logConfig, dbAddress, dbLog, dbReBuild } = Base;
export default Base;
