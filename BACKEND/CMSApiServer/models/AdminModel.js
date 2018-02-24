'use strict';

const mysql = require('mysql');
const DBConfig = require('./../config/DBConfig');
const pool = mysql.createPool(DBConfig);

const transactionWrapper = require('./TransactionWrapper');

/*********
 * TODO 유저 플래그가 어드민이 아니라면 reject
 * @param inputData
 * @returns {Promise<any>}
 */
exports.allowContent = (inputData) => {
  return new Promise((resolve, reject) => {
    const sql =
      `
      UPDATE games SET games.flag = 1
      WHERE games.idx = ?
      LIMIT 1;
      `;
    pool.query(sql, [inputData.gameIdx], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};