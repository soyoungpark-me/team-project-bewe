const validate = require('express-validation');

const authCtrl = require('../controllers/AuthCtrl');
const rankCtrl = require('../controllers/RankCtrl');
const historyCtrl = require('../controllers/HistoryCtrl');

module.exports = (router) => {
  router.route('/game/result')
    .post(authCtrl.auth, historyCtrl.fetchResult);

  router.route('/ranks/games/buy')
    .get(rankCtrl.getResults('game_buy'));

  router.route('/ranks/users/buy')
    .get(rankCtrl.getResults('user_buy'));

  router.route('/ranks/games/time')
    .get(rankCtrl.getResults('game_time'));

  router.route('/ranks/users/time')
    .get(rankCtrl.getResults('user_time'));

  return router;
};