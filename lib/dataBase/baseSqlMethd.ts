import { mysqlMethod } from "./mysqlLink";
/**
 * mysql 库提供的键值对格式成字符串的方法
 * @param range object 用来转换的键值对 
 */
function objToSqlString(range) {
    return {
        toSqlString: function () {
            return mysqlMethod.escape(this._insertObj)
        },
        _insertObj: range
    }
}


/**
 * 获得基本的插入sql字符串
 * 
 * @export
 * @param {{
 *     tableName: string,
 *     range: object
 * }} {
 *     tableName,
 *     range
 * }
 * @returns {string}
 */
export function getInsertSqlString({
    tableName,
    range
}: {
    tableName: string,
    range: object
}): string {

    var sql = 'INSERT INTO ??(??) VALUE (?)';
    var keyArr = [];
    var valueArr = [];
    for (let key in range) {
        keyArr.push(key);
        valueArr.push(range[key]);
    }
    var inserts = [tableName, keyArr, valueArr];

    return mysqlMethod.format(sql, inserts)
}

/**
 * 获得基本的查询sql字符串
 * 
 * @export
 * @param {({
 *     tableName: string;
 *     getValue: string | any;
 *     range: object | string;
 * })} {
 *     tableName,
 *     range,
 *     getValue
 * }
 * @returns {string}
 */
export function getFindSqlString({
    tableName,
    range,
    getValue
}: {
    tableName: string;
    getValue: string | any;
    range: object | string;
}): string {

    let sql = 'SELECT ?? FROM ?? ';
    let keySqlStr: string | object = '';
    let inserts = [getValue, tableName];
    if (typeof getValue === 'string') {
        sql = `SELECT ${getValue} FROM ??`;
        inserts = [tableName]
    }
    if (typeof range === 'object') {
        sql = sql + 'WHERE ?';
        keySqlStr = objToSqlString(range);
        inserts.push(keySqlStr);
    } else if (typeof range === 'string') {
        sql = 'SELECT ?? FROM ?? WHERE ' + range;
    }

    return mysqlMethod.format(sql, inserts)
}

export function getUpdataSqlString({
    tableName,
    oldRange,
    newRange
}: {
    tableName: string,
    oldRange: object,
    newRange: object
}): string {
    let sql = 'UPDATE ?? SET ? WHERE ?';
    let valueSqlStr = objToSqlString(newRange);
    let keySqlStr = objToSqlString(oldRange);
    let inserts = [tableName, valueSqlStr, keySqlStr];

    return mysqlMethod.format(sql, inserts)
}

/**
 * 获得基本的删除字符串
 *
 * @export
 * @param {{
 *     tableName:string,
 *     range:object | string
 * }} {
 *     tableName,
 *     range
 * }
 * @returns {string}
 */
export function getDelSqlString({
    tableName,
    range
}: {
    tableName: string,
    range: object | string
}): string {
    let sql = 'DELETE FROM ?? ';
    let inserts: Array<any> = [tableName];

    if (typeof range === 'object') {
        sql = sql + 'WHERE ?';
        let keySqlStr = objToSqlString(range);
        inserts.push(keySqlStr);
    } else if (typeof range === 'string') {
        sql = 'SELECT ?? FROM ?? WHERE' + range;
    } else {
        throw 'getDelSqlString: 错误的入参'
    }

    return mysqlMethod.format(sql, inserts);
}

