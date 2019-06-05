
/*****
 * 提供查询数据库的方法
 */
import { poolInstance } from './mysqlLink';
import * as mysql from 'mysql';
import { queryBean } from '../type/bean/resultBean';
import { loggerErr } from '../utils/logger'


class sqlActionHandle {
    private connection: mysql.PoolConnection
    constructor() {

    }
    getConnection() {
        let that = this;
        return new Promise((resolve, reject) => {
            const pool = poolInstance.getPool();
            pool.getConnection(function (err, connection) {
                if (err) {
                    loggerErr.error('\n', err);
                    resolve(false)
                    return
                }
                resolve(true)
                that.connection = connection;
            });
        });
    }
    async query(sqlString) {
        let connection = this.connection;

        let result: queryBean = await new Promise(async (resolve, reject) => {
            if (!(connection && connection.state === 'authenticated')) {
                this.release();
                let connected = await this.getConnection();

                if (!connected) {
                    resolve(makeConnectionErrRes())
                    return
                }
                connection = this.connection;
            }
            connection.query(sqlString, function (qErr, result, fields) {
                if (qErr) {
                    loggerErr.error(`\n`, qErr);
                    resolve(makeQueryErrRes());
                    return
                }

                resolve(new queryBean({
                    retState: 1,
                    result,
                }));
            })
        })
        return result

    }
    release() {
        let connection = this.connection;
        if (connection && connection.release) {
            connection.release()
        }
        this.connection = null;
    }
}

function makeOnceAction() {
    let handle = new sqlActionHandle();
    return async function (sqlString) {
        let result = await handle.query(sqlString);
        handle.release();
        return result
    }
}
/**
 *  单次查询
 *  每次查询后自动释放查询线程
 */
export let sqlOnceAction = makeOnceAction();

/**
 * 多次查询
 * 手动释放查询线程
 */
export async function getSqlAction() {
    let handle = new sqlActionHandle();
 
    await handle.getConnection();
 
    return {
        query: function(sqlString){
            return handle.query(sqlString)
        },
        destroy: function () {
            handle.release();
            handle = null;
        }
    }
}


/**
 *  创建链接错误的返回对象
 */
function makeConnectionErrRes() {
    return new queryBean({
        retState: -1,
        errMsg: 'sql connection Err'
    });
}
/**
 *  创建查询错误的返回对象
 */
function makeQueryErrRes() {
    return new queryBean({
        retState: -2,
        errMsg: 'sql query Err'
    });
}