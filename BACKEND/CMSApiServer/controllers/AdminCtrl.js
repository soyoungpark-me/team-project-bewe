'use strict';

const adminModel = require('../models/AdminModel');


/**********
 * 어드민이 게임 승인
 * TODO 승인 취소 추가
 * @param req
 * @param res
 * @param next
 * @returns {Promise.<*>}
 */
exports.allowContent = async(req, res, next) => {
  let result = '';

  try{
    const inputData = {
      gameIdx: req.body.gameIdx,
    };
    result = await adminModel.allowContent(inputData);

  } catch (error){
    return next(error);
  }

  return res.r(result);
};

