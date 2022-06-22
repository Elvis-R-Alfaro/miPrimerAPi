const sequelize = require('sequelize');
const db = new sequelize(
    'sigres2',
    'root',
    '2121',
    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306,
    }
);
module.exports = db;