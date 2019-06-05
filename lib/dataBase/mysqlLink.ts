/****
 * 连接池管理
 * mysql一些方法的单独暴露
 */

import * as mysql from 'mysql';
import { mysqlConfig } from '../../config/index';
import { loggerErr, logger } from '../utils/logger'

class baseMySQLHandle {
    private poolInstance: mysql.Pool;
    private status: {
        link: number
    }
    constructor() {
        logger.info(`pool: 连接池创建链接 ${mysqlConfig.host}:${mysqlConfig.port}`);
        this.poolInstance = mysql.createPool(mysqlConfig);
        this.status = {
            link: 0
        }
        this.lisitonEvent();

    }
    getPool(): mysql.Pool {
        return this.poolInstance
    }
    private lisitonEvent() {
        let mysqlPool = this.poolInstance
        var state = this.status;

        //从池中获得线程
        mysqlPool.on('acquire', function (connection) {
            state.link++
        });

        //释放线程回池
        mysqlPool.on('release', function (connection) {
            state.link--
        });
        mysqlPool.on('error', function (err) {
            loggerErr.error(`pool Error: \n`, err);
        });

    }
    /**
     *  关闭连接池
     *   如果会在子进程中运行则需要关闭，关闭时务必确保所有action已经之星完毕
     */
    close() {
        if (this.status.link == 0) {
            logger.info('pool: 连接池关闭');
            this.poolInstance.end(function (err) {
                if (err) {
                    loggerErr.error('\n', err);
                }
            })
        } else {
            logger.warn(`pool:连接池还有链接正在使用时尝试关闭 连接数 ${this.status.link}`);
            setTimeout(this.close.bind(this), 3000);
        }
    }
}

export const poolInstance = new baseMySQLHandle();


export const mysqlMethod = {
    format: mysql.format,
    escape: mysql.escape
}
