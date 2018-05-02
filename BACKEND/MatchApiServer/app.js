const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const winston = require('winston');
const cors = require('cors');
const redis = require('redis');
const jwt = require('jsonwebtoken');
const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const pool = require('./util/db').pool;
const config = require('./config/config');

global.authCtrl = require('../../COMMON/Auth/AuthCtrl')
  .setup(pool, config, redis, jwt);

require('./routes')(app);

require('../../COMMON/ErrorHandler')(app, 
  require('./util/logger'),
  require('express-validation'));

const PORT = 4001;
app.listen(PORT, () => {
  console.info(`[BEWE-MattApiServer] Listening on Port ${PORT}`);
});

module.exports = app;
