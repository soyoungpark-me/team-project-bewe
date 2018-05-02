const validate = require('express-validation');

const contentCtrl = require('../controllers/ContentCtrl');
const historyCtrl = require('../controllers/HistoryCtrl');
const authCtrl = global.authCtrl;

module.exports = (router) => {

  router.route('/games/result')
    .post(authCtrl.auth, historyCtrl.fetchResult);



  return router;
};