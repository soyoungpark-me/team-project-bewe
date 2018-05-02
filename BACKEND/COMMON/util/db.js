const mysql = require('mysql');
const DBConfig = require('../config/DBConfig');
const pool = mysql.createPool(DBConfig);

const redis = require('redis');
const client = redis.createClient(6379, '127.0.0.1');

module.exports.pool = pool;
module.exports.client = client;