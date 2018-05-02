'use strict';


const imageCtrl = require('../../COMMON/util/ImageCtrl');
const storeCtrl = require('../controllers/StoreCtrl');
const authCtrl = global.authCtrl;

module.exports = (router) => {
  router.route('/store')
    .get(authCtrl.auth, storeCtrl.listAll);

  router.route('/store/:idx')
    .post(authCtrl.auth, storeCtrl.purchase);

  router.route('/store/mylists')
    .get(authCtrl.auth, storeCtrl.lists);

  router.route('/store/friends/:idx')
    .get(authCtrl.auth, storeCtrl.friendToGamesList);

  router.route('/store/games/:idx')
    .get(authCtrl.auth, storeCtrl.gameToFriendsList);

  return router;
};