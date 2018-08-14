'use strict';

const fs = require('fs');
const list = fs.readdirSync(__dirname).filter(dir => !dir.match(/(^\.)|index/i));
const router = require('express').Router();


module.exports = (app) => {
  for (let ctrl of list) {
    app.use('/api', require(`./${ctrl}`)(router));
  }
};
