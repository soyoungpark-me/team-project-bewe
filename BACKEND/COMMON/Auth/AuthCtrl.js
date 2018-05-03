const authModelSetup = require('./AuthModel');

/*******************
 *  Authenticate
 ********************/
let authCtrl = {};

exports.setup = (pool, config, redis, jwt) => {
  const authModel = authModelSetup.setup(pool, config, redis, jwt);
  authCtrl.authModel = authModel;
  
  authCtrl.auth = (req, res, next) => {
    if (!req.headers.token) {
      return next(401);
    } else {
      authModel.auth(req.headers.token, (err, userIdx) => {
        if (err) {
          return next(err);
        } else {
          req.userIdx = userIdx;
          return next();
        }
      });
    }
  };

  return authCtrl;
}
