const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('./routes')(app);
// catch 404 and forward to error handler

require('./ErrorHandler')(app);


const PORT = 4001;
app.listen(PORT, () => {
  console.info(`[BEWE-MattApiServer] Listening on Port ${PORT}`);
});

module.exports = app;
