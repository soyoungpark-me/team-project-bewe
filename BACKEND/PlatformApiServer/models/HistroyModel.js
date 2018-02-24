'use strict';

const mysql = require('mysql');

const DBConfig = require('./../config/DBConfig');
const pool = mysql.createPool(DBConfig);


exports.fetchResult = (inputData) => {
  return new Promise((resolve, reject) => {
    let insertColumn = 0;
    const sql = `SELECT idx FROM game_result WHERE users_idx = ? AND games_idx = ?`

    pool.query(sql, [inputData.userIdx, inputData.gameIdx], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        if (rows.length > 0) {
          insertColumn = rows[0].idx;
        }        
        resolve(insertColumn);        
      }
    });
  }).then((insertColumn) => {
    return new Promise((resolve, reject) => {
      if (insertColumn === 0) {
        const sql =
        `
        INSERT INTO game_result(games_idx, users_idx, play_time, data)
        VALUES (?, ?, ?, ?)
        `;

        pool.query(sql, [inputData.gameIdx, inputData.userIdx, inputData.play_time, inputData.data], (err, rows) => {
          if (err) {
            reject(err);
          } else {
            if (rows.affectedRows === 1) {
              resolve(rows.insertId);
            } else {
              const _err = new Error("GAME RESULT INSERT CUSTOM ERR");
              reject(_err);
            }
          }
        });
      } else {
        const sql = 
        `
        UPDATE game_result 
          SET play_time = ADDTIME(play_time, ?), data = ? 
        WHERE users_idx = ? AND games_idx = ?
        `;

        pool.query(sql, [inputData.play_time, inputData.data, inputData.userIdx, inputData.gameIdx], (err, rows) => {
          if (err) {
            reject(err);
          } else {
            if (rows.affectedRows === 1) {
              resolve(insertColumn);
            } else {
              const _err = new Error("GAME RESULT UPDATE CUSTOM ERR");
              reject(_err);
            }
          }
        });
      }
    });
  }).then((columnIdx) => {
    return new Promise((resolve, reject) => {
      const sql =
        `
        SELECT 
          u.nickname,
          u.email,
          u.avatar,
          g.title,
          g.image,
          g.description,
          gr.play_time 
        FROM game_result AS gr
          LEFT JOIN games AS g ON gr.games_idx = g.idx
          LEFT JOIN users AS u ON gr.users_idx = u.idx
        WHERE gr.idx = ? 
        `;
      pool.query(sql, columnIdx, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows[0]);
        }
      })
    })
  })
};

