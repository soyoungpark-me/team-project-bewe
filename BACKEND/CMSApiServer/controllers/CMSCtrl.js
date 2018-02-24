'use strict';

const cmsModel = require('../models/CMSModel');


exports.register = async(req, res, next) => {
  let result = '';

  let images = [];
  console.log(req.body);
  // TODO 이미지 없는경우 예외처리
  if (!req.files) { // 이미지가 없는 경우
    images.push(null)
  } else {
    req.files.map((file) => {
      images.push(file.location);
    })
  }

  try{
    const inputData = {
      userIdx: req.userIdx,
      title: req.body.title,
      genre: req.body.genre,
      description: req.body.description,
      images: images
    };

    result = await cmsModel.register(inputData);
    // result.urls = result.urls.split(',')
  } catch (error) {
    console.log(error);
    return next(error);
  }


  return res.r(result);
};

/***********
 * 게임 수정
 * TODO 게임을 등록한 본인만 수정 가능
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
exports.putData = async(req, res, next) => {
  let result = '';
  try {

    let images = [];
    // TODO 이미지 없는경우 예외처리
    if (!req.files) { // 이미지가 없는 경우
      images.push(null)
    } else {
      req.files.map((file) => {
        images.push(file.location);
      })
    }

    const inputData = {
      gameIdx: req.params.idx,
      userIdx: req.userIdx,
      title: req.body.title,
      genre: req.body.genre,
      description: req.body.description,
      images: images
    };

    result = await cmsModel.putData(inputData);
  } catch (error) {
    return next(error);
  }

  return res.r(result)
};


/******
 * 자신이 등록한 게임 조회
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
exports.list = async(req, res, next) => {
  let result = '';

  try {
    result = await cmsModel.list(req.userIdx);
  } catch (error) {
    return next(error);
  }
  return res.r(result);
};


/*********
 * 자신이 등록한 게임 상세 조회
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*|void>}
 */
exports.getData = async(req, res, next) => {
  let result = '';

  try {
    const gameIdx = req.params.idx;
    result = await cmsModel.getData(gameIdx);
    result.urls = result.urls.split(',')

  } catch (error) {
    return next(error);
  }

  return res.r(result);
};