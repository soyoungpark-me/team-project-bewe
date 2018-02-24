'use strict';

const authModel = require('../models/AuthModel');

/*******************
 *  Authenticate
 ********************/
exports.auth = (req, res, next) => {
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

exports.checkSession = (req, res, next) => {
  if (!req.headers.token) {
    return next(401);
  } else {
    authModel.checkSession(req.headers.token, (err, userIdx) => {
      if(err){
        return next(err);
      } else {
        req.userIdx = userIdx;
        return next();
      }
    });
  }
};