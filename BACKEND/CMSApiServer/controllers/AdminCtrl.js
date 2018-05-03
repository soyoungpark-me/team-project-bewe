const adminModel = require('../models/AdminModel');


/**********
 * 승인이 필요한 컨텐츠 조회
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
exports.reqAllowContents = async(req, res, next) => {
  let result = '';

  try {

    result = await adminModel.reqAllowContents();

  } catch (error) {
    return next(error);
  }


  return res.r(result);
};

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

    console.log('game idx: ', inputData.gameIdx );
    result = await adminModel.allowContent(inputData);

  } catch (error){
    return next(error);
  }

  return res.r(result);
};

