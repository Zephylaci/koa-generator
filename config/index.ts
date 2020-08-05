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
var config = {
    host: "localhost",
    port: 8082,
    logConfig: {
        basePath: "../logs",
        level: "debug", // debug watching  running
    },
};
export let { logConfig, port } = config;

export default config;
