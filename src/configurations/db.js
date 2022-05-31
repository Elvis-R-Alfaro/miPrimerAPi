const sequelize = require('sequelize');
const db = new sequelize(
    'base de datos',
    'usuario',
    'contraseña',
    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306,
    }
);
module.exports = db;