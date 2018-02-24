'use strict';

const userModel = require('../models/UserModel');
const config = require('../config/config');
const resMsg = require('../errors.json');


/*******************
 *  Register
 ********************/
exports.register = async(req, res, next) => {

  let pw;
  if (req.body.pw1 !== req.body.pw2) {
    return res.status(400).json(resMsg[1404])
  } else {
    pw = req.body.pw1
  }
  let image;
  if (!req.file) { // 이미지가 없는 경우
    image = null;
  } else {
    image = req.file.location;
  }


  let result = '';
  try {
    const configData = config.doCypher(pw);
    const userData = {
      id: req.body.id,
      pw: configData.pw,
      nickname: req.body.nickname,
      email: req.body.email,
      avatar: image,
      salt: configData._salt
    };

    result = await userModel.register(userData);

  } catch (error) {
    // TODO 에러 잡았을때 응답메세지, 응답코드 수정할것
    //   if (isNaN(error)) {`
    //     // console.log(error);
    //     return res.status(500).json(resMsg[9500]);
    //   } else {
    //     console.log(error);
    //     return res.status(400).json(resMsg[8400]);
    //   }
      console.log(error);
      return next(error)
  }

  // success
  return res.r(result[0]);

};

exports.check = async(req, res, next) => {
  let result = '';
  try {
    const userData = req.body.id;
    result = await userModel.check(userData);
  } catch (error) {
    // console.log(error); // 1401
    if (isNaN(error)) {
      // console.log(error);
      return res.status(500).json(resMsg[9500]);
    } else {
      // console.log(error);
      return res.status(409).json(resMsg[1401]);
    }
  }

  // FIXME 리턴값 수정하기
  return res.status(200).json(result);


};

/*******************
 *  Login
 *  TODO validation
 ********************/
exports.login = async(req, res, next) => {

  if (!req.body.id || !req.body.pw) {
    return res.status(400).end();
  }

  let result = '';


  try {
    const getSalt = await userModel.getSalt(req.body.id);

    //TODO 회원가입을 안하고 로그인할 경우
    //TODO salt of undefined 예외 처리
    const userData = {
      id: req.body.id,
      pw: config.doCypher(req.body.pw, getSalt.salt).pw
    };

    result = await userModel.login(userData);

    const sessionData = {
      token: result.token,
      idx: result.profile.idx,
      id: result.profile.id,
      nickname: result.profile.nickname,
      // ip: req.body.ip,
      ip: '127.0.0.1'
    };
    await userModel.setSession(sessionData);
  } catch (error) {
    return next(error);
  }
  // success
  return res.json(result);
};

/***********
 * 유저 프로필 조회
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
exports.profile = async(req, res, next) => {
  let result ='';
  try {
    const userData = req.userIdx;

    result = await userModel.profile(userData)

  } catch (error) {
    console.log(error);
    return next(error)
  }
  return res.json(result);
};


/**********
 * 다른 유저 정보 조회
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
exports.list = async(req, res, next) => {
  let result = '';

  try{
    const userIdx = req.params.idx;

    result = await userModel.list(userIdx);
  } catch (error) {
    return next(error);
  }
  return res.r(result);
};


/**********
 * 다른 유저 id 조회
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
exports.getId = async(req, res, next) => {
  let result = '';

  try{
    const userIdx = req.params.idx;

    result = await userModel.getId(userIdx);
  } catch (error) {
    return next(error);
  }
  return res.r(result);
};