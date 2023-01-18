import { dbClient } from './sqlite.js';

export const dbInstance = dbClient;

Promise.resolve().then(() => {
    // 增量同步
    // { alter: true }
    // 全量同步
    //.sync({ force: true });
    dbInstance.sync({ force: true });
});
