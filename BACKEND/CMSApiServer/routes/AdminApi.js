'use strict';

const authCtrl = require('../controllers/AuthCtrl');
const adminCtrl = require('../controllers/AdminCtrl');

module.exports = (router) => {

  router.route('/admin/allow')
    .post(authCtrl.auth, adminCtrl.allowContent);

  return router;
};