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
const events = require('events');
const app = express();

if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}

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

global.eventEmitter = new events.EventEmitter();
global.requests = new Map();

require('dotenv').config();
const config = require('../COMMON/config/config');

global.pool = require('../COMMON/util/db').pool;
global.client = require('../COMMON/util/db').client;
global.authCtrl = require('../COMMON/Auth/AuthCtrl')
  .setup(pool, config, redis, jwt);

require('./routes')(app);

require('../COMMON/ErrorHandler')(app, 
  require('../COMMON/util/logger'),
  require('express-validation'));

const PORT = 9002;
const server = app.listen(PORT, () => {
  console.info(`[BEWE-PlatformApiServer] Listening on Port ${PORT}`);
});

module.exports = app;