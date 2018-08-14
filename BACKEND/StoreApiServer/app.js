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
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const { find, filter } = require('lodash');
const schema = require('./schema/Schema').schema;

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


require('dotenv').config();
const config = require('../COMMON/config/config');
global.pool = require('../COMMON/util/db').pool;

global.authCtrl = require('../COMMON/Auth/AuthCtrl')
  .setup(pool, config, redis, jwt);

require('./routes')(app);

require('../COMMON/ErrorHandler')(app, 
  require('../COMMON/util/logger'),
  require('express-validation'));

// The GraphQL endpoint
app.use('/graphql',
  bodyParser.json(),
  graphqlExpress({
    schema
  }));

// GraphiQL, a visual editor for queries
app.use('/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql'
  }));

const PORT = 9003;
app.listen(PORT, () => {
  console.info(`[BEWE-StoreApiServer] Listening on Port ${PORT}`, `\n Test GraphQL http://localhost:${PORT}/graphiql`);

});

module.exports = app;
