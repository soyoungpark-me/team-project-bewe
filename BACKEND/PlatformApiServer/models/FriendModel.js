'use strict';

const transactionWrapper = require('../../COMMON/TransactionWrapper');

// 친구 리스트
exports.list = (userData) => {
  return new Promise((resolve, reject) => {
    const sql = 
      `SELECT * FROM friends WHERE (sender_idx = ? OR receiver_idx = ?)`;
    pool.query(sql, [userData, userData], (err, rows) => {
      if(err){
        console.log(err);
        reject(err);
      }else{
        resolve(rows);
      }
    });
  });  
};

// 친구 요청 전송
exports.send = (userData, receiverIdx) => {
  return new Promise((resolve, reject) => {
    if(userData == receiverIdx){ // 요청한 사람과 받은 사람의 id가 같을 경우 캔슬
      reject(2402);
    }

    const sql = 
      `SELECT idx 
         FROM friends 
        WHERE (sender_idx = ? AND receiver_idx = ?) OR
              (receiver_idx = ? AND sender_idx = ?)`;
    
    pool.query(sql, [userData, receiverIdx, userData, receiverIdx], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        if (rows.length !== 0) { // 이미 친구 요청을 보냈을 경우
          reject(2401);
        } else {
          resolve(null);
        }
      }
    });
  })
  .then(() => {
    return new Promise((resolve, reject) => {
      const sql = 
        `INSERT INTO friends
          (flag, sender_idx, receiver_idx) VALUES (0, ?, ?)`;

      pool.query(sql, [userData, receiverIdx], (err, rows) => {
        if(err){
          console.log(err);
          reject(err);
        }else{
          if (rows.affectedRows === 1) {
            resolve(null);
          } else {
            const _err = new Error("Friends send Custom error");
            reject(_err);
          }
        }
      });
    });
  })
  .then(() => {
    return new Promise((resolve, reject) => {
      const sql = 
        "SELECT nickname, avatar FROM users WHERE idx = ?";
      
      pool.query(sql, [userData], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          if (rows.length == 0) { 
            reject(400);
          } else {
            resolve({
              nickname: rows[0].nickname, 
              avatar: rows[0].avatar
            });
          }
        }
      });
    })
  })
};

// 친구 요청 수락, 거절
exports.handleRequest = (type, userData, idx) => {  
  return new Promise((resolve, reject) => {
    const sql = 
      `SELECT flag, sender_idx, receiver_idx, nickname, avatar
         FROM friends join users
           ON friends.sender_idx = users.idx
        WHERE friends.idx = ?`;
    pool.query(sql, [idx], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        if (rows.length !== 0) { // 일치하는 친구 요청이 있을 경우
          if (rows[0].receiver_idx == userData && rows[0].flag == 0){ 
            // 친구 요청의 수신자와 current_user의 id가 같고, flag가 0일 때만 업데이트
            resolve({
              idx: rows[0].sender_idx, 
              name: rows[0].nickname, 
              avatar: rows[0].avatar});
          } else {
            reject(2402);
          }
        } else {
          reject(2403);
        }
      }
    });
  }).then((senderInfo) => {
    return new Promise((resolve, reject) => {
      let sql = '';

      if (type == 'accept') {
        sql = "UPDATE friends SET flag = 1 WHERE idx = ?";
      } else if (type == 'reject') {
        sql = "UPDATE friends SET flag = 2 WHERE idx = ?";
      }

      pool.query(sql, [idx], (err, rows) => {
        if(err){
          console.log(err);
          reject(err);
        }else{
          if (rows.affectedRows === 1) {
            if (type === 'accept') {
              resolve(senderInfo);
            } else {
              resolve(rows);
            }
          } else {
            const _err = new Error("Friends accept Custom error");
            reject(_err);
          }
        }
      });
    });
  });
};

exports.cancel = (userData, idx) => {
  return new Promise((resolve, reject) => {
    transactionWrapper.getConnection(pool)
    .then(transactionWrapper.beginTransaction)
    .then((context) => {
      return new Promise((resolve, reject) => {
        const sql = 
          `
          SELECT idx, sender_idx, receiver_idx, flag 
            FROM friends 
           WHERE idx = ?
          `;
        
        context.conn.query(sql, [idx], (err, rows) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            if (rows[0].sender_idx !== userData) {
              reject(2404);
            } else {
              context.result = rows[0];
              resolve(context);
            }
          }
        });
      })
      .then((context) => {
        return new Promise((resolve, reject) => {
          const sql = "DELETE FROM friends WHERE idx = ?";
  
          context.conn.query(sql, [idx], (err, rows) => {
            if (err) {
              console.log(err);
              reject(err);
            } else {
              if (rows.affectedRows === 1) { // 컬럼 삭제 성공
                resolve(context);
              } else {
                context.error = new Error("Friends Cancel Custom Error 1");
                reject(context);
              }
            }
          });
        });
      })
      .then((context) => {
        return new Promise((resolve, reject) => {
          const sql = 
            `
            DELETE FROM notifications 
             WHERE type = "friend" AND users_idx = ?
            `
          
          context.conn.query(sql, [context.result.receiver_idx], (err, rows) => {
            if (err) {
              console.log(err);
              reject(err);
            } else {
              if (rows.affectedRows === 1) { // 컬럼 삭제 성공
                context.result = rows
                resolve(context);
              } else {
                context.error = new Error("Friends Cancel Delete Noti Custom Error 1");
                reject(context);
              }
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
        });
      });
    });
  });
};



exports.searchId = (inputData) => {
  return new Promise((resolve, reject) => {
    const sql =
      `
       SELECT
         idx,
         id,
         email,
         avatar
       FROM users
       WHERE id REGEXP ?;
      `;

    pool.query(sql, inputData, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    })
  })
};