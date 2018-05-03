const transactionWrapper = require('../../COMMON/TransactionWrapper');

// 전체 대화방 리스트
exports.listConversation = (userData) => {
  return new Promise((resolve, reject) => {
    const sql = 
      `SELECT * FROM conversations 
        WHERE users_idx_1 = ? OR users_idx_2 = ? 
        ORDER BY updated_at DESC`;

    pool.query(sql, [userData, userData], (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

exports.checkConversation = (userIdx, receiverIdx) => {
  return new Promise((resolve, reject) => {
    const sql = 
      `
      SELECT idx FROM conversations 
       WHERE users_idx_1 = ? AND users_idx_2 = ?
          OR users_idx_1 = ? AND users_idx_2 = ?
      `;

    pool.query(sql, [userIdx, receiverIdx, receiverIdx, userIdx], (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        if (rows.length > 0) {
          resolve({result: true});
        } else {
          resolve({result: false});
        }        
      }
    });
  });
}

exports.new = (userIdx) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT idx FROM messages 
                  WHERE receiver_idx = ? AND flag = 0`;
    
    pool.query(sql, [userIdx], (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });  
};

exports.newFromConversation = (userIdx, conversationIdx) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT idx FROM messages 
                  WHERE receiver_idx = ? AND flag = 0 AND conversation_idx = ?`;
    
    pool.query(sql, [userIdx, conversationIdx], (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });  
};

exports.getNewMessage = (messageIdx) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM messages WHERE idx = ?';

    pool.query(sql, [messageIdx], (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

// 대화방 내 채팅 리스트
exports.getConversation = (userData, conversationId) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM conversations WHERE idx = ?';
    
    pool.query(sql, [conversationId], (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        if (rows.length === 1 &&
           (rows[0].users_idx_1 === userData ||
            rows[0].users_idx_2 === userData)) {
          resolve(conversationId);
        } else {
          reject(2412);
        }
      }
    });
  })
  .then((conversationId) => {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE messages
                      SET flag = 1 
                    WHERE conversation_idx = ? AND receiver_idx = ?`;
      
      pool.query(sql, [conversationId, userData], (err, rows) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(conversationId);
        }
      });
    });
  })
  .then((conversationId) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM messages WHERE conversation_idx = ?';
      
      pool.query(sql, [conversationId], (err, rows) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  });
};

// 대화방이 존재하는지 확인하고 없으면 새로 생성한다
exports.openConversation = (userData, receiverData) => {
  return new Promise((resolve, reject) => {
    if (userData === receiverData) {
      reject(2411);
    }

    transactionWrapper.getConnection(pool)
    .then(transactionWrapper.beginTransaction)
    .then((context) => {
      return new Promise((resolve, reject) => {
        const sql = 
          `
          SELECT idx 
            FROM conversations 
           WHERE (users_idx_1 = ? AND users_idx_2 = ?) OR (users_idx_1 = ? AND users_idx_2 = ?)
          `;

        context.conn.query(sql, [userData, receiverData, receiverData, userData], (err, rows) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            context.result = rows;
            resolve(context);
          }
        });
      });
    })
    .then((context) => {
      return new Promise((resolve, reject) => {
        if (context.result.length === 0) {
          console.log("새 대화방 생성");
          const last_message = "이제 Messager에서 친구와 쪽지를 주고 받을 수 있습니다!";
          const sql = 
            'INSERT INTO conversations (users_idx_1, users_idx_2, last_message) VALUES (?, ?, ?)';
          context.conn.query(sql, [userData, receiverData, last_message], (err, rows) => {
            if (err) {
              console.log(err);
              reject(err);
            } else {
              if (rows.affectedRows === 1) { // 대화방 생성
                context.flag = 1;
                context.msg = last_message;
                context.result = rows;
                resolve(context);
              } else {
                context.error = new Error("Create Conversation Custom Error 1");
                reject(context);
              }
            }
          });
        } else { // 이미 대화방이 있을 경우 생성하지 않는다.
          context.flag = 0;
          context.result.insertId = JSON.parse(JSON.stringify(context.result))[0].idx;
          resolve(context);
        }
      });         
    })
    .then((context) => {
      return new Promise((resolve, reject) => {
        if(context.flag === 1) {
          const sql = 
              'INSERT INTO messages (contents, sender_idx, receiver_idx, conversation_idx) VALUES (?, ?, ?, ?)';
            context.conn.query(sql, [context.msg, userData, receiverData, context.result.insertId], (err, rows) => {
              if(err){
                console.log(err);
                reject(err);
              }else{
                console.dir(context);
                if (rows.affectedRows === 1) { // 메시지 생성
                  resolve(context);
                } else {
                  context.error = new Error("Create Conversation Custom Error 1");
                  reject(context);
                }
              }
            });
          } else if(context.flag === 0) {
            resolve(context);
          }
        });
    })
    .then(transactionWrapper.commitTransaction)
    .then((context) => {
      context.conn.release();
      resolve(context.result.insertId);
    })
    .catch((context) => {
      context.conn.rollback(() => {
        context.conn.release();
        reject(context.error);
      });
    });
  });
};

// 메시지 전송하기
exports.sendMessage = (messageData) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT users_idx_1, users_idx_2 FROM conversations WHERE idx = ?';
    pool.query(sql, [messageData.conversation_idx], (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        if (rows.length === 1) {
          resolve(rows);
        } else {
          reject(2412);
        }
      }
    });
  })
  .then((rows) => {
    return new Promise((resolve, reject) => {
      let sql = '';
      let receiver_idx = 0;

      if (rows[0].users_idx_1 === messageData.sender_idx) { // users_idx_2 = receiver_idx
        receiver_idx = rows[0].users_idx_2;
      } else if (rows[0].users_idx_2 === messageData.sender_idx) { // users_idx_1 = receiver_idx
        receiver_idx = rows[0].users_idx_1;
      }
      sql = 
        `
        INSERT INTO messages (contents, sender_idx, receiver_idx, conversation_idx)
                VALUES (?, ?, ?, ?)
        `;
        
      pool.query(sql, [messageData.contents, messageData.sender_idx, receiver_idx, 
        messageData.conversation_idx], (err, rows) => {
        
        if(err){
          console.log(err);
          reject(err);
        }else{
          if (rows.affectedRows === 1) { // 메시지 생성 
            resolve({receiverIdx: receiver_idx,
            insertId: rows.insertId});
          } else {
            const _err = new Error("Send Message Custom error");
            reject(_err);
          }
        }
      })
    });
  })
  .then((data) => {
    // 마지막으로 해당 conversation 업데이트
    return new Promise((resolve, reject) => {
      const sql = 
          "UPDATE conversations SET last_message = ?, updated_at = now() WHERE idx = ?";
      
      pool.query(sql, [messageData.contents, messageData.conversation_idx], (err, rows) => {
        if(err){
          console.log(err);
          reject(err);
        }else{
          if (rows.affectedRows === 1) { // conversation 업데이트 완료
            resolve(data);
          } else {
            const _err = new Error("Update Conversation Custom error");
            reject(_err);
          }
        }
      });
    });
  });
};