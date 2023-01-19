import instance from './device.js';
import './model/Hello.js';
import { dbReBuild } from '../../config/index.js';

if (dbReBuild) {
    // 增量同步
    // { alter: true }
    // 全量同步
    //.sync({ force: true });
    instance.sync({ force: true });
}

export const dbInstance = instance;
