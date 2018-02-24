const validate = require('express-validation');

const authCtrl = require('../controllers/AuthCtrl');
const messageCtrl = require('../controllers/MessageCtrl');

module.exports = (router) => {

  /* Message */
  router.route('/messages')
    .get(authCtrl.auth, messageCtrl.list('conversations'))
    .post(authCtrl.auth, messageCtrl.openConversation);

  router.route('/messages/:idx')
    .get(authCtrl.auth, messageCtrl.list('messages'));
  
  router.route('/message/:idx')
    .get(authCtrl.auth, messageCtrl.list('last'));

  router.route('/newmessages')
    .get(authCtrl.auth, messageCtrl.new('all'));

  router.route('/newmessages/:idx')
    .get(authCtrl.auth, messageCtrl.new('conversation'));
  
  router.route('/check/:idx')
    .get(authCtrl.auth, messageCtrl.check);
    
  return router;
};