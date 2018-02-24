'use strict';


const imageCtrl = require('../controllers/ImageCtrl');
const authCtrl = require('../controllers/AuthCtrl');
const userCtrl = require('../controllers/UserCtrl');


module.exports = (router) => {

  router.route('/test')
    .get(authCtrl.checkSession, authCtrl.auth, userCtrl.profile);

  // USER
  router.route('/users/register')
    .post(imageCtrl.uploadSingle, userCtrl.register);
  router.route('/users/check')
    .post(userCtrl.check);

  router.route('/users/login')
    .post(userCtrl.login);

  // PROFILE
  router.route('/users')
    .get(authCtrl.checkSession, authCtrl.auth, userCtrl.profile);

  router.route('/users/:idx')
    .get(authCtrl.checkSession, authCtrl.auth, userCtrl.list);

  router.route('/users/id/:idx')
    .get(authCtrl.checkSession, authCtrl.auth, userCtrl.getId);

  return router;
};