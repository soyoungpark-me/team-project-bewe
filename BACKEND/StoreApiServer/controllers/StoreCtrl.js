'use strict';

const storeModel = require('../models/StoreModel');
const resMsg = require('../../COMMON/errors.json');
const client = require('../../COMMON/util/db').client;

exports.listAll = async(req, res, next) => {
  let result = '';

  try{

    result = await storeModel.listAll();
  } catch (error) {
    return next(error);
  }

  return res.r(result);
};


/*******
 * 유저가 구매한 게임 리스트 조회
 * @param req
 * @param res
 * @param next
 * @returns {Promise.<*>}
 */
exports.lists = async(req, res, next) => {
  let result = '';
  try {
    const inputData = {
      userIdx: req.userIdx,
    };
    result = await storeModel.lists(inputData);
  } catch (error) {
    return next(error);
  }

  return res.r(result);
};


/***********
 * 게임 구매
 * TODO 중복 구매 예외처리
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
exports.purchase = async(req, res, next) => {
  let result = '';
  const userIdx = req.userIdx;
  const gameIdx = req.params.idx;


  try {
    const inputData = {
      userIdx,
      gameIdx
    };

    result = await storeModel.purchase(inputData);

    const userData = JSON.stringify({
      userIdx,
      nickname: result.nickname,
      email: result.email,
      avatar: result.avatar
    });

    const gameData = JSON.stringify({
      gameIdx,
      title: result.title,
      description: result.description,
      image: result.image
    });
    
    if (result !== '') {
      client.zscore('user_has_games', userData, (err, score) => {
        if (score) {
          score = 1 + parseInt(score);
        } else {
          score = 1;
        }
          
        client.zadd('user_has_games', score, userData, (err, result) => {
          if (err) {
            console.log(err);
          }
        });        
      });

      client.zscore('game_has_users', gameData, (err, score) => {
        if (score) {
          score = 1 + parseInt(score);
        } else {
          score = 1;
        }

        client.zadd('game_has_users', score, gameData, (err, result) => {
          if (err) {
            console.log(err);
          }
        });        
      });
    }
  } catch (error){
    return next(error)
  }

  return res.r(result);

};


/************
 * 친구의 게임 리스트 조회
 * TODO 친구 확인 과정 함수화
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
exports.friendToGamesList = async(req, res, next) => {
  let result = '';

  try{
    const inputData = {
      sender: req.userIdx,
      receiver: req.params.idx,
    };


    result = await storeModel.checkFriend(inputData);

    if (result.flag === 1 ){
      result = await storeModel.lists(inputData.receiver);
    } else {
      return res.json(resMsg[9403])
    }
  } catch (error) {
    if (isNaN(error)) {
      return res.status(400).json(resMsg[9402])
    } else {
      return next(error);
    }
  }

  return res.r(result);
};

/***********
 * 게임을 구매한 친구 리스트 조회
 * TODO 친구 확인 과정 함수화
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
exports.gameToFriendsList = async(req, res, next) => {
  let result = '';

  try {
    const inputData = {
      sender: req.userIdx,
      receiver: req.params.idx,
    };

    result = await storeModel.checkFriend(inputData);
    if (result.flag === 1){
      result = await storeModel.gameToFriendsList(inputData.receiver);
      // result.urls = result.urls.split(',');
    } else {
      return res.json(resMsg[9403]);
    }

  } catch (error) {
    if (isNaN(error)) {
      return res.status(400).json(resMsg[9402]);
    } else {
      return next(error);
    }
  }

  return res.r(result)
};


