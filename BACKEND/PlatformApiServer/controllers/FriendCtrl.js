const friendModel = require('../models/FriendModel');
const notiCtrl = require('./NotiCtrl');

// 내 친구 리스트
exports.list = async(req, res, next) => {
  let result ='';
  try {
    const userData = req.userIdx;

    result = await friendModel.list(userData)
  } catch (error) {
    console.log(error);
    return next(error);
  }
  return res.status(200).json(result);
};

// 친구 추가
exports.send = async(req, res, next) => {
  let result = '';
  const userData = req.userIdx;
  const receiverIdx = req.body.receiver_idx;

  await new Promise(async (resolve, reject) => {
    let senderInfo = '';
    try {
      senderInfo = await friendModel.send(userData, receiverIdx);
    } catch (error) {
      console.log(error);
      return next(2402);
    }
    resolve(senderInfo);
  })
  .then(async (senderInfo) => {
    await new Promise(async (resolve, reject) => {
      let notiResult = '';
      
      try {
        result = await notiCtrl.create(receiverIdx, 'friend_receive', 
          {nickname: senderInfo.nickname, avatar:senderInfo.avatar});
      } catch (error) {
        console.log(error);
        return next(2402);
      }
      resolve();
    });
  });

  return res.status(201).json(result);
};

// 친구 요청 수락
exports.accept = async(req, res, next) => {
  let result = '';
  const userData = req.userIdx;
  const idx = req.params.idx;

  await new Promise(async (resolve, reject) => {
    let senderInfo = '';
    try {
      senderInfo = await friendModel.handleRequest('accept', userData, idx);
    } catch (error) {
      console.log(error);
      reject(500);
    }
    resolve(senderInfo);
  })
  .then(async (senderInfo) => {
    await new Promise(async (resolve, reject) => {
      let notiResult = '';
      
      try {
        result = await notiCtrl.create(senderInfo.idx, 'friend_accepted', 
          {nickname: senderInfo.name, avatar:senderInfo.avatar});
      } catch (error) {
        console.log(error);
        reject(500);
      }
      resolve();
    });
  });

  return res.status(201).json(result);
};

// 친구 요청 거절
exports.reject = async(req, res, next) => {
  let result = '';
  try {
    const userData = req.userIdx;
    const idx = req.params.idx;

    result = await friendModel.handleRequest('reject', userData, idx);
  } catch (error) {
    console.log(error);
    return next(error);
  }
  return res.status(201).json(result);
};

// 보낸 친구 요청 취소
exports.cancel = async(req, res, next) => {
  let result = '';
  try {
    const userData = req.userIdx;
    const idx = req.params.idx;

    result = await friendModel.cancel(userData, idx);
  } catch (error) {
    console.log(error);
    return next(error);
  }

  return res.status(201).json(result);
};


exports.searchId = async(req, res, next) => {
  let result = '';

  try {
    const inputData = req.body.id;

    if (!inputData) {
      return res.status(400);
    }

    result = await friendModel.searchId(inputData);
  } catch (error) {
    return next(error);
  }


  return res.r(result);
};