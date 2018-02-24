'use strict';

const validate = require('express-validation');

const authCtrl = require('../controllers/AuthCtrl');
const friendCtrl = require('../controllers/FriendCtrl');
const notiCtrl = require('../controllers/NotiCtrl');

module.exports = (router) => {
  // /* Friend */
  // router.route('/users/friends')
  //   .get(authCtrl.auth, friendCtrl.list('all'));
  //
  // router.route('/users/friends/send')
  //   .get(authCtrl.auth, friendCtrl.list('send'))
  //   .post(authCtrl.auth, friendCtrl.send);
  //
  // router.route('/users/friends/receive')
  //   .get(authCtrl.auth, friendCtrl.list('receive'));
  //
  // router.route('/users/friends/accept')
  //   .post(authCtrl.auth, friendCtrl.handleRequest('accept'));
  //
  // router.route('/users/friends/reject')
  //   .post(authCtrl.auth, friendCtrl.handleRequest('reject'));
  //
  //
  // /* Message */
  // router.route('/messages')
  //   .get(authCtrl.auth, messageCtrl.list('conversations'));
  //
  // router.route('/messages/create')
  //   .post(authCtrl.auth, messageCtrl.openConversation);
  //
  // router.route('/messages/:idx')
  //   .get(authCtrl.auth, messageCtrl.list('messages'))
  //   .post(authCtrl.auth, messageCtrl.sendMessage);
  //
  // router.route('/noti/list')
  //   .get(notiCtrl.list);
  //
  // router.route('/noti/create')
  //   .get(notiCtrl.create);
  //
  // // router.route('/noti/check')
  // //   .get(notiCtrl.check);


  return router;
};