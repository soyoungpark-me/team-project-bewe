// // events 모듈 사용
// const events = require('events');

// // EventEmitter 객체 생성
// const eventEmitter = new events.EventEmitter();

// const connectHandler = function connected(){
//   console.log("eventEmitter 생성, 연결");
  
//   // data_recevied 이벤트를 발생시키기
//   eventEmitter.emit("data_received");
// }

// const createNotiHandler = () => {
//   console.log("create noti event 발생");
// }

// eventEmidtter.on('connection', connectHandler);
// eventEmitter.on('create_noti', createNotiHandler);

// module.exports = eventEmitter;