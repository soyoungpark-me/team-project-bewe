exports.listAll = () => {
  return new Promise((resolve, reject) => {
    const sql =
      `
      SELECT
        g.idx,
        g.flag,
        g.title,
        g.genre,
        g.description,
        g.image,
        g.created_at
      FROM games AS g
      WHERE g.flag = 1
      `;
    pool.query(sql, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};


/*********
 * 유저가 구매한 게임 리스트 조회
 * @param inputData
 * @returns {Promise}
 */
exports.lists = (inputData) => {
  return new Promise((resolve, reject) => {
    const sql =
      `
      SELECT
        g.idx,
        g.title,
        g.image,
        g.description,
        ug.created_at
      FROM users_has_games AS ug
        LEFT JOIN games AS g ON ug.games_idx = g.idx
      WHERE ug.users_idx = ? AND g.flag = 1
      `;
    pool.query(sql, [inputData.userIdx], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};


/*************
 * 게임 구매
 * TODO 중복 구매 예외처리
 * @param inputData
 * @returns {Promise<any>}
 */
exports.purchase = (inputData) => {
  return new Promise((resolve, reject) => {
    const sql =
      `
      INSERT INTO users_has_games (users_idx, games_idx)
      VALUES (?, ?)
      `;
    pool.query(sql, [inputData.userIdx, inputData.gameIdx],
      (err ,rows) => {
        if (err) {
          reject(err)
        } else {
          if (rows.affectedRows === 1) {
            resolve(rows);
          } else {
            const _err = new Error("PURCHASE CUSTOM ERROR 1");
            reject(_err);
          }
        }
      })
  }).then((result) => {
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
          ug.created_at
        FROM users_has_games AS ug
          LEFT JOIN games AS g ON ug.games_idx = g.idx
          LEFT JOIN users AS u ON ug.users_idx = u.idx
        WHERE ug.idx = ?
        `;
      pool.query(sql, [result.insertId], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows[0])
        }
      });
    });
  })
};


exports.checkFriend = (inputData) => {
  return new Promise((resolve, reject) => {
    const sql =
      `
       SELECT
        flag
       FROM friends
       WHERE (sender_idx = ? AND receiver_idx = ?) 
        OR 
       (sender_idx = ? AND receiver_idx = ?)
      `;

    pool.query(sql, [inputData.sender, inputData.receiver,
    inputData.receiver, inputData.sender], (err, rows) => {
      if (err) {
        reject(9402);
      } else {
        resolve(rows[0]);
      }
    })
  })
};



exports.gameToFriendsList = (inputData) => {
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
      FROM users_has_games AS ug
        LEFT JOIN games AS g ON ug.games_idx = g.idx
        LEFT JOIN game_images AS gi ON g.idx = gi.games_idx
        LEFT JOIN users u ON ug.users_idx = u.idx
      WHERE ug.users_idx = ? AND g.flag = 1;
      `;

    pool.query(sql, [inputData], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    })
  })

};


