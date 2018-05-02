'use strict';


const imageCtrl = require('../controllers/ImageCtrl');
const cmsCtrl = require('../controllers/CMSCtrl');
const authCtrl = global.authCtrl;

module.exports = (router) => {

  router.route('/cms')
    .get(authCtrl.auth, cmsCtrl.list);

  router.route('/cms/register')
    .post(imageCtrl.uploadArray, authCtrl.auth, cmsCtrl.register);

  router.route('/cms/:idx')
    .get(authCtrl.auth, cmsCtrl.getData)
    .put(imageCtrl.uploadArray, authCtrl.auth, cmsCtrl.putData);
  return router;
};