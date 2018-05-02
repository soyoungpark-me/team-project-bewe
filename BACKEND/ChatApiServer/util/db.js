const mysql = require('mysql');
const DBConfig = require('../config/DBConfig');
const pool = mysql.createPool(DBConfig);

const redis = require('redis');
const client = redis.createClient(6379, '52.78.25.56');

module.exports.pool = pool;
module.exports.client = client;