const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const winston = require('winston');
const cors = require('cors');
const app = express();

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

require('dotenv').config();
require('./routes')(app);

require('../COMMON/ErrorHandler')(app, 
  require('../COMMON/util/logger'),
  require('express-validation'));

const PORT = 9001;
app.listen(PORT, () => {
  console.info(`[BEWE-AuthApiServer] Listening on Port ${PORT}`);
});

module.exports = app;
