import axios from 'axios';

const AUTH_URL = 'http://127.0.0.1:3000/api/users';
const STORE_URL = 'http://127.0.0.1:3002/api/store';
const CHAT_URL = 'http://127.0.0.1:4000/api';

exports.fetchOtherId = async (idx) => {
  let result = '';

  await axios.get(`${AUTH_URL}/id/${idx}`, 
    {headers: {'token' : JSON.parse(localStorage.getItem('token'))}})
    .then((response) => {result = response});
    
  return result;
}

exports.fetchOtherProfile = async (idx) => {
  let result = '';

  await axios.get(`${AUTH_URL}/${idx}`, 
    {headers: {'token' : JSON.parse(localStorage.getItem('token'))}})
    .then((response) => {result = response});
    
  return result;
}

exports.fetchFriendsGameLists = async (idx) => {
  let result = '';

  await axios.get(`${STORE_URL}/friends/${idx}`, 
    {headers: {'token' : JSON.parse(localStorage.getItem('token'))}})
    .then((response) => {result = response});

  return result;
}

exports.checkConversation = async (idx) => {
  let result = '';

  await axios.get(`${CHAT_URL}/check/${idx}`, 
    {headers: {'token' : JSON.parse(localStorage.getItem('token'))}})
    .then((response) => {result = response});

  return result;
}