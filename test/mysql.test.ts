/****
 * 基本增删改查的测试
 */
import { sqlOnceAction, getSqlAction } from "../lib/dataBase/mysqlControl";
import { poolInstance } from "../lib/dataBase/mysqlLink";
import { getFindSqlString, getInsertSqlString, getUpdataSqlString, getDelSqlString } from "../lib/dataBase/baseSqlMethd";


test('mysqlTest', () => {
    let testProcess = new Promise(async (resolve, reject) => {
        expect.assertions(12);

        await sqlOnceAction('CREATE TABLE IF NOT EXISTS test( `id` INT PRIMARY KEY AUTO_INCREMENT, `name` VARCHAR(50)  );').then(res => {
            expect(res.retState).toBe(1);
        });

        let handle = await getSqlAction();
        for (var i = 0; i < 4; i++) {
            let insertSql = getInsertSqlString({
                tableName: 'test',
                range: {
                    name: 'Tom' + i,
                    id: i + 1
                }
            })
            await handle.query(insertSql).then(res => {
                expect(res.retState).toBe(1);
            });
        }
        await sqlOnceAction('SELECT * FROM test').then(res => {
            expect(res.result.length).toBe(4);
            console.log('第一次查询结果：\n', res.result);
        });
        let upSql = getUpdataSqlString({
            tableName: 'test',
            oldRange: {
                name: 'Tom3'
            },
            newRange: {
                name: 'Tom6'
            }
        });

        await handle.query(upSql).then(res => {
            expect(res.retState).toBe(1);
        });

        let findSql = getFindSqlString({
            tableName: 'test',
            range: {
                name: 'Tom6'
            },
            getValue: ['id', 'name']
        });

        await handle.query(findSql).then(res => {
            expect(res.result[0]['name']).toBe('Tom6');
            console.log('更改一次后的查询结果：', res.result);
        });


        let delSql = getDelSqlString({
            tableName: 'test',
            range: {
                name: 'Tom6'
            }
        })

        await handle.query(delSql).then(res => {
            expect(res.retState).toBe(1);
        });

        await sqlOnceAction('SELECT * FROM test').then(res => {
            expect(res.result.length).toBe(3);
            console.log('删除"Tom6"后的查询结果：\n', res.result);
        });

        await sqlOnceAction('DROP TABLE test').then(res => {
            expect(res.retState).toBe(1);
        });

        await sqlOnceAction('SHOW TABLES').then(res => {
            expect(res.retState).toBe(1);
            console.log('删除测试表后的结果:', res.result);
        });
        handle.destroy()
        poolInstance.close();

        resolve();
    });
    return testProcess
});

