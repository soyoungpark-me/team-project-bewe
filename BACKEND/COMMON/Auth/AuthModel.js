let authModel = {};

/*******************
 *  Authenticate
 *  @param: token
 ********************/
exports.setup = (pool, config, redis, jwt) => {
  const client = redis.createClient(6379, '127.0.0.1');

  authModel.auth = (token, done) => {
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

  return authModel;
}
