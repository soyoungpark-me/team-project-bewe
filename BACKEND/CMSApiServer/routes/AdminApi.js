'use strict';

const adminCtrl = require('../controllers/AdminCtrl');
const authCtrl = global.authCtrl;

module.exports = (router) => {

  router.route('/admin/list')
    .get(authCtrl.auth, adminCtrl.reqAllowContents);
  router.route('/admin/allow')
    .post(authCtrl.auth, adminCtrl.allowContent);

  return router;
};