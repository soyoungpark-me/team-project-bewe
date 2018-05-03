const mysql = require('mysql');
const redis = require('redis');
const jwt = require('jsonwebtoken');

const config = require('../../COMMON/config/config');
const pool = require('../../COMMON/util/db').pool;
const client = require('../../COMMON/util/db').client

/*******************
 *  Authenticate
 *  @param: token
 ********************/
exports.auth = (token, done) => {
  jwt.verify(token, config.jwt.cert, (err, decoded) => {
    if (err) {
      switch (err.message) {
        case 'jwt expired': return done(10401);
        case 'invalid token': return done(10403);
        default: return done(err.message);
      }
    } else {
      const sql = "SELECT idx FROM users WHERE id = ?";

      pool.query(sql, [decoded.id], (err, rows) => {
        if (err) {
          return done(err);
        } else {
          if (rows.length === 0) {
            return done(401);
          } else {  // 인증 성공
            return done(null, rows[0].idx);
          }
        }
      })
    }
  });
};

exports.checkSession = (token, done) => {
  client.hgetall(token, (err, obj) => {
    if(err){
      return done(401)
    }
    if (obj === null){
        return done(401)
    } else {
      return done(null, obj.idx)
    }
  });
};