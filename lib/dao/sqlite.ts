import { Sequelize } from 'sequelize';
import { dbAddress } from '../../config/index.js';

export const dbClient = new Sequelize({
    dialect: 'sqlite',
    storage: dbAddress,
    logging: true
});
