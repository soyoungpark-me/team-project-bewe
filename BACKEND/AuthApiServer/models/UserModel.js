'use strict';

const mysql = require('mysql');
const DBConfig = require('./../config/DBConfig');
const pool = mysql.createPool(DBConfig);

const jwt = require('jsonwebtoken');
const config = require('../config/config');

const redis = require('redis');
const client = redis.createClient(6379, '52.78.25.56');

/*******************
 *  Register
 *  @param: user_data = {id, pw, nickname}
 ********************/
exports.register = (userData) => {
  return new Promise((resolve, reject) => {
      const sql = "SELECT id FROM users WHERE id = ?";

      pool.query(sql, [userData.id], (err, rows) => {  // 아이디 중복 체크
        if (err) {
          reject(err);
        } else {
          if (rows.length !== 0) {  // 이미 아이디 존재
            reject(1401);
          }else{
            resolve(null);
          }
        }
      });
    }
  ).then(() => {
      return new Promise((resolve, reject) => {
        const sql =
          "INSERT INTO users(id, pw, email, nickname, avatar, salt) " +
          "VALUES (?, ?, ?, ?, ?, ? ) ";


        pool.query(sql, [userData.id, userData.pw,
          userData.email,userData.nickname,
          userData.avatar, userData.salt], (err, rows) => {  // 가입 시도
          if (err) {
            reject(err);
          } else {
            if (rows.affectedRows === 1) {
              resolve(rows);
            } else {
              const _err = new Error("User Register Custom error");
              reject(_err);
            }
          }
        });
      });
    }
  ).then((result) => {
    return new Promise((resolve, reject) => {
      const sql =
        "SELECT idx, id, nickname, avatar, created_at " +
        "FROM users " +
        "WHERE idx = ?";

      pool.query(sql, result.insertId, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  });
};

exports.check = (userData) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT id FROM users WHERE id =?';

    pool.query(sql, userData, (err, rows) => {
      if (err){
        reject(err);
      } else {
        if (rows.length !==0) {
          reject(1401)
        } else{
          resolve(rows);
        }
      }
    });
  });
};
/****************
 * salt 조회
 * @returns {Promise<any>}
 */
exports.getSalt = (userData) => {
  return new Promise((resolve, reject) => {
    const sql =
      `
      SELECT salt FROM users WHERE id = ?
      `;
    pool.query(sql, [userData], (err, rows) => {
      if (err){
        reject(err);
      } else {
        resolve(rows[0])
      }
    });
  });
};
/*******************
 *  Login
 *  @param: userData = {user_id, user_password}
 ********************/
exports.login = (userData) => {
  return new Promise((resolve, reject) => {
      const sql = "SELECT id FROM users WHERE id = ?";

      pool.query(sql, [userData.id], (err, rows) => {  // 아이디 존재 검사
        if (err) {
          reject(err);
        } else {
          if (rows.length === 0) {  // 아이디 없음
            reject(1402);
          } else {
            resolve(null);
          }
        }
      });
    }
  ).then(() => {
    return new Promise((resolve, reject) => {
      const sql =
        "SELECT idx, id, nickname, avatar " +
        "FROM users " +
        "WHERE id = ? and pw = ?";

      pool.query(sql, [userData.id, userData.pw], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          if (rows.length === 0) {  // 비밀번호 틀림
            reject(1403);
          } else {
            const profile = {
              idx: rows[0].idx,
              id: rows[0].id,
              nickname: rows[0].nickname
            };
            const token = jwt.sign(profile, config.jwt.cert, {'expiresIn': "10h"});

            const result = {
              profile,
              token
            };
            resolve(result);
          }
        }
      });
    });
  });
};


exports.profile = (userData) => {
  return new Promise((resolve, reject) =>{
    const sql =
      "SELECT idx, id, nickname, avatar, email, created_at " +
      "FROM users " +
      "WHERE idx = ?";

    pool.query(sql, userData, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows[0]);
      }
    });
  });
};


/***********
 * 토큰값을 받아와 redis에 저장
 * @returns {Promise<any>}
 */
exports.setSession = (sessionData) => {
  return new Promise((resolve, reject) => {
    client.hmset(sessionData.token,
      {
        'idx': sessionData.idx,
        'id': sessionData.id,
        'nickname': sessionData.nickname,
        'ip': sessionData.ip
      });
    client.expireat(sessionData.token, parseInt((+new Date)/1000) + 43200);
    client.hgetall(sessionData.token, (err, obj) => {
      if(err){
        console.log(err);
        reject(err);
      } else {
        resolve(obj);
      }
    })
  });
};


/**********
 * 다른 유저 정보 조회
 * @param userIdx
 * @returns {Promise<any>}
 */
exports.list = (userIdx) => {
  return new Promise((resolve, reject) => {
    const sql =
      `
      SELECT idx, nickname, email, avatar
      FROM users
      WHERE idx = ?
      `;
    pool.query(sql, userIdx, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows[0]);
      }
    });
  })
};


/**********
 * 다른 유저 정보 조회
 * @param userIdx
 * @returns {Promise<any>}
 */
exports.getId = (userIdx) => {
  return new Promise((resolve, reject) => {
    const sql =
      `
      SELECT idx, id, nickname, email, avatar
      FROM users
      WHERE idx = ?
      `;
    pool.query(sql, userIdx, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows[0]);
      }
    });
  })
};


/**********
 * 다른 유저 id 조회
 * @param userIdx
 * @returns {Promise<any>}
 */
exports.getId = (userIdx) => {
  return new Promise((resolve, reject) => {
    const sql =
      `
      SELECT id, avatar, created_at
      FROM users
      WHERE idx = ?
      `;
    pool.query(sql, userIdx, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows[0]);
      }
    });
  })
};










