import { dbInstance } from '../index.js';
import { DataTypes } from 'sequelize';
import { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';

class HelloModel extends Model<InferAttributes<HelloModel>, InferCreationAttributes<HelloModel>> {
    declare key: string;
    declare value: CreationOptional<string>;
}

export const Hello = dbInstance.define<HelloModel>(
    'Hello',
    {
        key: {
            type: DataTypes.STRING,
            unique: true,
            primaryKey: true
        },
        value: {
            type: DataTypes.STRING
        }
    },
    {
        tableName: 'Hello',
        createdAt: 'createTime',
        updatedAt: 'updateTime'
        // sequelize: dbInstance
    }
);

// export const Hello = HelloModel.init(
//     {
//         key: {
//             type: DataTypes.STRING,
//             unique: true,
//             primaryKey: true
//         },
//         value: {
//             type: DataTypes.STRING
//         }
//     },
//     {
//         tableName: 'Hello',
//         createdAt: 'createTime',
//         updatedAt: 'updateTime',
//         sequelize: dbInstance
//     }
// );
