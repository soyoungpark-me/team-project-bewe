'use strict';

const messageCtrl = require('../controllers/MessageCtrl');
const socketIO = require('socket.io');
let io = null;
let clients = [];

exports.io = () => {
  return io;
};

exports.clients = () => {
  return clients;
}


exports.initialize = (pub, sub) => {
  const PORT = 4002;  
  
  const server = require('http').createServer();
  server.listen(PORT, () => {
    console.info(`[BEWE-MessageSocketServer] Listening on Port ${PORT}`);
  });

  io = require('socket.io')(server, { origins: '*:*'});
  
  // pub, sub 구현. message는 채널 이름이 겹치므로 채널 이름을 one_to_one으로 바꿔서 함.  
  sub.subscribe('one_to_one');

  // message를 받았을 때, 채널이 one_to_one인 경우에만 처리하도록 함.
  sub.on('message', (channel, data) => {
    console.log('Message [' + data + '] on channel [' + channel + '] arrived!');

    if (channel === 'one_to_one') {
      // 여기에 들어왔다는 것은, 메시지가 도착했는데 소켓이 그 서버에는 없다는 소리.
      // 동시에 다른 서버에도 pub을 했을 테니까... 여기서도 똑같이 있으면 처리한다. 대신 없으면 다시 pub 해줄 필요없이 무시.
      client.to(getClientId(data.receiverIdx)).emit('new_message', 
      {
        messageIdx: data.insertId,
        senderIdx: userIdx,
        contents: contents
      });
    }
  });


  io.on('connection', (client) => { // 웹 소켓 연결
    // 일단 현재 서버 내에 클라이언트 정보를 저장해 놓는다.
    client.on('store_client_info', function (data) {
      // customId가 현재 서버에 저장되어 있지 않으면 새로 발급 받고 sub한다.
      if (getClientId(data.customId) === -1) {
        var clientInfo = new Object();
        clientInfo.customId = data.customId;
        clientInfo.clientId = client.id;
        clients.push(clientInfo);        
      }
    });

    // send_message 이벤트를 클라이언트로부터 전달 받았을 때,
    // sendMessage 함수를 호출해 DB 작업을 마친 후,
    // 클라이언트를 현재 가지고 있는 소켓 리스트에서 찾은 뒤에 있으면 보내준다.
    // 만약 현재 서버에 해당 클라이언트가 없다면, 다른 서버에 있다는 이야기이므로 pub을 통해 다른 서버에 publish 해준다.
    client.on('send_message', async (conversationIdx, userIdx, contents) => {
      const data = await messageCtrl.sendMessage(conversationIdx, userIdx, contents);

      if (getClientId(data.receiverIdx) === -1) {
        data.senderIdx = userIdx;
        data.contents = contents;
        pub.publish('one_to_one', data);
      } else {
        client.to(getClientId(data.receiverIdx)).emit('new_message', 
        {
          messageIdx: data.insertId,
          senderIdx: userIdx,
          contents: contents
        });
      }      
    });
  
    client.on('disconnect', function (data) {
      for(let i=0, len=clients.length; i<len; ++i) {
        let c = clients[i];

        if(c.clientId === client.id) {
          clients.splice(i,1);
          break;
        }
      }
      sub.quit();
    });
  });  
};

function getClientId(customId) {
  let result = -1;

  for(let i=0; i<clients.length; i++) {
    if(clients[i].customId === customId) {
      result = clients[i].clientId;
      break;
    }
  }

  return result;
}