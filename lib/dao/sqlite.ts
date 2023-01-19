import { Sequelize } from 'sequelize';
import { dbAddress, dbLog } from '../../config/index.js';
import { loggerSql } from '../utils/logger.js';

export const dbClient = new Sequelize({
    dialect: 'sqlite',
    storage: dbAddress,
    logging: dbLog
        ? function (sql, options) {
              loggerSql.info(`${sql}`);
          }
        : false
});
