const mysql = require('mysql');
const DBConfig = require('../config/DBConfig');
const pool = mysql.createPool(DBConfig);

const redis = require('redis');
const client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);
client.auth(process.env.REDIS_PASSWORD);

module.exports.pool = pool;
module.exports.client = client;