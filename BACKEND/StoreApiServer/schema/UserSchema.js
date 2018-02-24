'use strict';
const Game = require('./GameSchema');

exports.User = `
  type User {
    idx: Int!,
    id: String,
    pw: String,
    nickname: String,
    email: String,
    avatar: String,
    salt: String,
    perm: Int,
    
    games: [Game],
    
  }
`;


// export default () => [User, Game];


