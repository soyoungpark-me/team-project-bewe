const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
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

require('./routes')(app);

//error handler
require('./ErrorHandler')(app);

const PORT = 3001;
const server = app.listen(PORT, () => {
  console.info(`[BEWE-PlatformApiServer] Listening on Port ${PORT}`);
});

module.exports = app;