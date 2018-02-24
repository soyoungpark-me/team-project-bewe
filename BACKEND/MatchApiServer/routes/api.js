'use strict';

const roomCtrl = require('../controllers/RoomCtrl');
const authCtrl = require('../controllers/AuthCtrl');

module.exports = (router) =>{
    router.route('/roomlist/:seq')
        .get(authCtrl.checkSession, authCtrl.auth, roomCtrl.findSeq);
    router.route('/createroom')
        .post(roomCtrl.createRoom);
    router.route('/deleteroom')
        .post(roomCtrl.deleteRoom);
    router.route('/execgame')
        .post(roomCtrl.execgame);
    return router;
};