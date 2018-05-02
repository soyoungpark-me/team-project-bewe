const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const winston = require('winston');
const cors = require('cors');
const http = require('http');
const redis = require('redis');
const jwt = require('jsonwebtoken');
const app = express();

const pub = redis.createClient(6379, '127.0.0.1');
const sub = redis.createClient(6379, '127.0.0.1');

const server = http.createServer(app);
const io = require('./socket/socketService')(server, pub, sub);
require('./socket/messageSocket').initialize(pub, sub);
  
sub.subscribe('sub');
sub.on('subscribe',function (channel, count) {
  console.log("Subscribed to " + channel + ". Now subscribed to " + count + " channel(s).");
});

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.r = (result) => {
    res.json({
      status: true,
      message: "success",
      result,
    });
  };
  next();
});

const config = require('../COMMON/config/config');

global.pool = require('../COMMON/util/db').pool;
global.authCtrl = require('../COMMON/Auth/AuthCtrl')
  .setup(pool, config, redis, jwt);

require('./routes')(app);

require('../COMMON/ErrorHandler')(app, 
  require('../COMMON/util/logger'),
  require('express-validation'));

const PORT = 4000;
server.listen(PORT, () => {
  console.info(`[BEWE-ChatApiServer] Listening on Port ${PORT}`);
});

module.exports = app;