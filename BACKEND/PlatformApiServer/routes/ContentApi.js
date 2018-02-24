const validate = require('express-validation');

const authCtrl = require('../controllers/AuthCtrl');
const contentCtrl = require('../controllers/ContentCtrl');
const historyCtrl = require('../controllers/HistoryCtrl');
module.exports = (router) => {

  router.route('/games/result')
    .post(authCtrl.auth, historyCtrl.fetchResult);



  return router;
};