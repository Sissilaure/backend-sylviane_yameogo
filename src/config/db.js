const mysql = require('mysql2');
const config = require('./database');

const pool = mysql.createPool(config.db);

module.exports = pool.promise();