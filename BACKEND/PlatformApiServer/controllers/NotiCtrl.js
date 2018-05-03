const notiModel = require('../models/NotiModel');

// 알림 리스트
module.exports.list = async (req, res, next) => {
  let result = '';
  const page = req.params.page || 1;

  try {
    const userData = req.userIdx;
    result = await notiModel.list(userData, page);
  } catch (error) {
    console.log(error);
    return next(error);
  }
  return res.status(200).json(result);
};

module.exports.new = async (req, res, next) => {
  let result = '';

  try {
    const userData = req.userIdx;

    result = await notiModel.new(userData);
  } catch (error) {
    console.log(error);
    return next(error);
  }
  return res.status(200).json(result.length);
}

// 알림 생성
module.exports.create = async (usersIdx, type, info) => {
  let result = '';
  try {
    const notificationData = {
      usersIdx,
      type,
      info
    };

    result = await notiModel.create(notificationData);    
  } catch (error) {
    console.log(error);
    return next(error);
  }
  
  const eventName = 'wait_new_noti_' + usersIdx;
  const keyName = 'new_noti_' + usersIdx;
  client.hexists(eventName, 'users_idx', (err, reply) => {
    let image = '';
    if (result.image === null) {
      image = 'null'
    } else {
      image = result.image;
    }
    client.hmset(keyName, {
      'users_idx': usersIdx,
      'contents': result.contents,
      'url': result.url,
      'image': image
    });
    global.eventEmitter.emit(eventName);
  });  

  const data = {
    'users_idx': usersIdx,
    'contents': result.contents,
    'url': result.url,
    'image': result.image
  }

  global.eventEmitter.emit('new_noti', parseInt(usersIdx), data);
  return result;
};

// 알림 확인
module.exports.check = async (req, res, next) => {
  let result = '';
  try {
    const notiIdx = req.params.idx;
    const userData = req.userIdx;

    result = await notiModel.check(notiIdx, userData);
  } catch (error) {
    console.log(error);
    return next(error);
  }
  return res.status(201).json(result);
};

module.exports.polling = async (req, res, next) => {
  // global.requests.set(req.userIdx, res);

  let result = '';
  const userData = req.userIdx;

  const eventName = 'wait_new_noti_' + userData;
  const keyName = 'new_noti_' + userData;

  client.hmset(eventName, {'users_idx': userData});
  client.expireat(eventName, parseInt((+new Date)/1000) + 43200);

  global.eventEmitter.once(eventName, () => {
    client.del(eventName);
    client.hgetall(keyName, (err, obj) => {
      if (err) {
        console.log(err);
      } else {
        client.del(keyName);
        global.eventEmitter.removeListener(eventName, ()=>{});
        return res.status(200).json(obj);
      }
    });
  });
}

// global.eventEmitter.on('new_noti', (usersIdx, data) => {
//   const res = global.requests.get(usersIdx);

//   if (res) {
//     return res.status(200).json(data);
//   }  
// });