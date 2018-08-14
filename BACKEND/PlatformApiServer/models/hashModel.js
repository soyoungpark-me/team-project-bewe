'use strict';

exports.list = (hashString) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT idx FROM hash WHERE tag = ?";
    
    pool.query(sql, [hashString], (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(rows[0].idx);
      }
    });
  })
  .then((rows)=>{
      return new Promise((resolve, reject) =>{
          const sql = `
            SELECT
                b.title,
                b.contents,
                b.users_idx,
                b.created_at
            FROM boards_has_hash as bh
            LEFT JOIN boards as b
            ON bh.boards_idx = b.idx
            WHERE hash_idx = ?
          `;
          pool.query(sql, rows, (err, rows) => {
            if (err) {
              console.log(err);
              reject(err);
            } else {
              // rows = rows.slice(0, 8);
              resolve(rows);
            }
          });
      })
  })
};

exports.newList = (hashString, page) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT idx FROM hash WHERE tag = ?";

    pool.query(sql, hashString, (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(rows[0].idx);
      }
    });
  })
  .then((rows)=>{
      return new Promise((resolve, reject) =>{
          const sql = `
            SELECT
                b.title,
                b.contents,
                b.users_idx,
                b.created_at
            FROM boards_has_hash as bh
            LEFT JOIN boards as b
            ON bh.boards_idx = b.idx
            WHERE hash_idx = ?
          `;
          pool.query(sql, rows, (err, rows) => {
            if (err) {
              console.log(err);
              reject(err);
            } else {
              rows = rows.slice(0, page * 8 + 8);
              setTimeout(()=>{
                resolve(rows);
              }, 2000);
            }
          });
      })
  })
};