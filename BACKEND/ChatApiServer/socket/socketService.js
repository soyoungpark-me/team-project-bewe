'use strict'
let rooms = [[], [], [], [], [] ,[] ,[] ,[], [], [], [], [], [], [], [], []
                ,[], [], [], [], [] ,[] ,[] ,[], [], [], [], [], [], [], [], []
                ,[], [], [], [], [] ,[] ,[] ,[], [], [], [], [], [], [], [], []
                ,[], [], [], [], [] ,[] ,[] ,[], [], [], [], [], [], [], [], []];
let readyUsers = [[], [], [], [], [] ,[] ,[] ,[], [], [], [], [], [], [], [], []
                ,[], [], [], [], [] ,[] ,[] ,[], [], [], [], [], [], [], [], []
                ,[], [], [], [], [] ,[] ,[] ,[], [], [], [], [], [], [], [], []
                ,[], [], [], [], [] ,[] ,[] ,[], [], [], [], [], [], [], [], []];

module.exports = function(server, pub, sub) {
  const io = require('socket.io')(server);

  sub.on("message", function (channel, data) {
    data = JSON.parse(data);

    if (parseInt("sendToSelf".localeCompare(data.sendType)) === 0) {
        io.emit(data.method, data.data);
    }else if (parseInt("sendToAllConnectedClients".localeCompare(data.sendType)) === 0) {
        io.sockets.emit(data.method, data.data);
    }else if (parseInt("sendToAllClientsInRoom".localeCompare(data.sendType)) === 0) {
        io.sockets.to(data.roomSeq).emit(data.method, data);
      }
  });

  
  io.on('connection', socket => {
    const username = socket.handshake.query.username;
    const usernamea = socket.handshake.query.username;
    const gameSeq = socket.handshake.query.gameSeq;
    const roomSeq = gameSeq +''+socket.handshake.query.roomSeq;
    
    console.log(`${username} connected`);

    socket.on('client:message', data => {
      console.log(`${username}: ${data.message}`);
      let reply = JSON.stringify({
        method: 'server:message',
        sendType: 'sendToAllClientsInRoom',
        messageData : {
          username : username,
          message : data.message
        },
        roomSeq : roomSeq,
        socketId : socket.id
      });
      
      pub.publish('sub', reply);
    });

    socket.on('joinRoom', data =>{
      console.log(`${username}님은 ${gameSeq}번 게임의 ${roomSeq}번 방에 접속하셨습니다. 환영합니다!`);

      socket.join(roomSeq);
     
      // const rooms = Object.keys(io.sockets.adapter.rooms[roomSeq].sockets);

      let keyname = '';
      let socketId = [];
      socketId[keyname + socket.id] = username;
      rooms[roomSeq].push(Object.values(socketId));

      let reply = JSON.stringify({
        method: 'server:joinRoom',
        sendType: 'sendToAllClientsInRoom',
        messageData : {
          username : '::: SYSTEM :::',
          message : username+'님이 접속하셨습니다.'
        },
        roomSeq : roomSeq,
        rooms: rooms[roomSeq],
        readyUsers: readyUsers[roomSeq]
      });

      pub.publish('sub', reply);
    });


    socket.on('chattReady', data=>{
      if(readyUsers[roomSeq].indexOf(data.username) != -1) return;
      readyUsers[roomSeq].push(data.username);
      console.log(readyUsers[roomSeq]);
      console.log(data.roomSize);
      let reply = JSON.stringify({
        method: 'server:chattReady',
        sendType: 'sendToAllClientsInRoom',
        roomSeq: roomSeq,
        rooms: rooms[roomSeq],
        readyUsers: readyUsers[roomSeq],
        roomSize: data.roomSize
      });
      pub.publish('sub', reply);
    });

    socket.on('gameStart', data=>{
      let reply = JSON.stringify({
        method: 'server:gameStart',
        sendType: 'sendToAllClientsInRoom',
        messageData: {
          username: username,
          message: `${usernamea}님이 나가셨습니다.`
        },
        roomSeq: roomSeq,
        readyUsers: readyUsers[roomSeq],
        rooms: rooms[roomSeq],
        redirect:1
      });

      pub.publish('sub', reply);
    });

    socket.on('disconnect', (data) => {
      readyUsers[roomSeq] = readyUsers[roomSeq].filter(function(ele){
        return ele != usernamea
      });

      socket.leave(roomSeq);
      rooms[roomSeq] = rooms[roomSeq].filter(function(ele){
        return ele != usernamea
      });
      
      
      let reply = JSON.stringify({
        method: 'server:disconnect',
        sendType: 'sendToAllClientsInRoom',
        messageData: {
          username: username,
          message: `${usernamea}님이 나가셨습니다.`
        },
        roomSeq: roomSeq,
        readyUsers: readyUsers[roomSeq],
        rooms: rooms[roomSeq],
        execgameState:0
      });

      pub.publish('sub', reply);
      console.log(`${username} disconnected`);
    });
  });

  return io;
}