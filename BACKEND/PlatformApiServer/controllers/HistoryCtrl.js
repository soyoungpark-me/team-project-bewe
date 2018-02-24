'use strict';

const moment = require('moment');
const historyModel = require('../models/HistroyModel');
const client = require('redis').createClient(6379, '52.78.25.56');

exports.fetchResult = async(req, res, next) => {
  let result = '';
  let temp = '';
  const userIdx = req.userIdx;
  const gameIdx = req.body.game_idx;

  try {
    const inputData = {
      userIdx,
      gameIdx, 
      play_time : req.body.play_time,
      data: req.body.data
    };

    result = await historyModel.fetchResult(inputData);

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

    const time = moment(result.play_time, 'HH:mm:ss').diff(moment().startOf('day'), 'seconds');
    console.log(time);
    if (result !== '') {
      client.zscore('user_play_time', userData, (err, score) => {
        client.zadd('user_play_time', time, userData, (err, result) => {
          if (err) {
            console.log(err);
          }
        });        
      });

      client.zscore('game_play_time', gameData, (err, score) => {
        client.zadd('game_play_time', time, gameData, (err, result) => {
          if (err) {
            console.log(err);
          }
        });        
      });      
    }

  } catch (error) {
    return next(error);
  }

  return res.r(result);
};