'use strict';

const mysql = require('mysql');
const DBConfig = require('./../config/DBConfig');
const pool = mysql.createPool(DBConfig);

const transactionWrapper = require('./TransactionWrapper');

/*************
 * 게임 등록
 * @param inputData
 * @returns {Promise<any>}
 *************/
exports.register = (inputData) => {
  let insertedIdx;
  return new Promise((resolve, reject) => {
    transactionWrapper.getConnection(pool)
      .then(transactionWrapper.beginTransaction)
      .then((context) => {
        return new Promise((resolve, reject) => {
          const sql =
            `
            INSERT INTO games (users_idx, title, genre, description, image)
            VALUES (?, ?, ?, ?, ?) 
            `;
          context.conn.query(sql,
            [
              inputData.userIdx, inputData.title,
              inputData.genre, inputData.description,
              inputData.images[0]
            ], (err, rows)=> {
            if (err) {
              context.error = err;
              reject(context)
            } else {
              if (rows.affectedRows === 1) { // 쓰기 시도 성공
                insertedIdx = rows.insertId;
                context.result = rows;
                resolve(context);
              } else {
                context.error = new Error("GAME REGISTER CUSTOM ERROR 1");
                reject(context)
              }
            }
            })
        })
      })
      .then((context) => {
        return new Promise((resolve, reject) => {
          let images = [];
          for(let i = 0; i<inputData.images.length;i++) {
            images[i] = [context.result.insertId];
            images[i].push(inputData.images[i])
          }
          const sql =
            `
            INSERT INTO game_images(games_idx, url)
            VALUES ?
            `;
          context.conn.query(sql, [images], (err, rows) => {
            if (err) {
              context.error = err;
              reject(context);
            } else {
              if (rows.affectedRows === (inputData.images.length)) {
                context.result = rows;
                resolve(context);
              } else {
                context.error = new Error("GAME REGISTER CUSTOM ERROR 2");
                reject(context);
              }
            }
          })
        });
      })
      .then((context) => {
        return new Promise((resolve, reject) => {
          const sql =
            `
           SELECT
            g.idx,
            g.title,
            g.genre,
            g.description,
            g.created_at,
            GROUP_CONCAT(gi.url) AS urls
          FROM games AS g
            LEFT JOIN game_images AS gi ON gi.games_idx = g.idx
          WHERE g.idx = ?
            `;
          context.conn.query(sql, [insertedIdx], (err, rows) => {
            if(err){
              context.error = err;
              reject(context);
            } else {
              context.result = rows[0];
              resolve(context);
            }
          });
        });
      })
      .then(transactionWrapper.commitTransaction)
      .then((context) => {
        context.conn.release();
        resolve(context.result);
      })
      .catch((context) => {
        context.conn.rollback(() => {
          context.conn.release();
          reject(context.error);
        })
      })
  });
};


/**************
 * 게임 수정 ( 대표 이미지만 수정 )
 * @returns {Promise<any>}
 **************/
exports.putData = (inputData) => {
  return new Promise((resolve, reject) => {
    transactionWrapper.getConnection(pool)
      .then(transactionWrapper.beginTransaction)
      .then((context) => {
        return new Promise((resolve, reject) => {
          const sql =
            `
            UPDATE games AS g
            SET g.title = ?, g.genre = ?, 
              g.description = ?, g.image =? 
            WHERE g.idx = ?
            LIMIT 1;
            `;
          context.conn.query(sql, [
            inputData.title, inputData.genre,
            inputData.description, inputData.images[0],
            inputData.gameIdx
          ], (err, rows) => {
            if (err){
              context.error = err;
              reject(context);
            } else {
              if (rows.affectedRows === 1 ){
                context.result = rows;
                resolve(context);
              } else {
                context.error = new Error("GAME EDIT CUSTOM ERROR1");
                reject(context);
              }
            }
          })
        })
      })
    //   .then((context) => {
    //     return new Promise((resolve, reject) => {
    //       let images = [];
    //       for(let i = 0; i<inputData.images.length;i++) {
    //         images[i] = [inputData.gameIdx];
    //         images[i].push(inputData.images[i])
    //       }
    //       const sql =
    //         `
    //         UPDATE game_images AS gi
    //         SET gi.games_idx= ?, gi.url = ?
    //         WHERE gi.games_idx = ?
    //         LIMIT ?;
    //         `;
    //       context.conn.query(sql, [
    //          images,images.length], (err, rows) => {
    //         if (err){
    //           context.error = err;
    //           reject(context);
    //         } else {
    //           console.log(2);
    //           if (rows.affectedRows === images.length) {
    //             context.result = rows;
    //             resolve(context);
    //           } else {
    //             context.error = new Error("GAME EDIT CUSTOM ERROR 2")
    //             reject(context);
    //           }
    //         }
    //       });
    //     })
    // })
      .then((context) => {
      return new Promise((resolve, reject) => {
        const sql =
          `
          SELECT
            g.idx,
            g.title,
            g.genre,
            g.description,
            g.created_at,
            GROUP_CONCAT(gi.url) AS urls
          FROM games AS g
            LEFT JOIN game_images AS gi ON gi.games_idx = g.idx
          WHERE g.idx = ?
          `;

        context.conn.query(sql, [inputData.gameIdx], (err, rows) => {
          if (err) {
            context.error = err;
            reject(context);
          } else {
            context.result = rows[0];
            resolve(context)
          }
        })
      })
    })
      .then(transactionWrapper.commitTransaction)
      .then((context) => {
        context.conn.release();
        resolve(context.result);
      })
      .catch((context) => {
        context.conn.rollback(() => {
          context.conn.release();
          reject(context.error);
        })
      })
  });
};

/*******
 * 자신이 등록한 게임 조회
 * @param inputData
 * @returns {Promise<any>}
 */
exports.list = (inputData) => {
  return new Promise((resolve, reject) => {
    const sql =
      `
      SELECT
        g.idx,
        g.title,
        g.genre,
        g.description,
        g.image,
        g.created_at
      FROM games AS g
      WHERE g.users_idx = ?               
      `;
    pool.query(sql, [inputData], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

/*********
 * 자신이 등록한 게임 상세조회
 * @returns {Promise<any>}
 */
exports.getData = (inputData) => {
 return new Promise((resolve, reject) => {
   const sql =
     `
     SELECT
      g.idx,
      g.title,
      g.genre,
      g.description,
      g.created_at,
      GROUP_CONCAT(gi.url) AS urls,
      g.flag
    FROM games AS g
      LEFT JOIN game_images AS gi ON gi.games_idx = g.idx
    WHERE g.idx = ?
     `;
   pool.query(sql, [inputData], (err, rows) => {
     if (err) {
       reject(err);
     } else {
       resolve(rows[0]);
     }
   });
 })
};