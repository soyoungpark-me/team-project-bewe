"use strict";

import axios from 'axios';
import io from 'socket.io-client';

export const FETCH_NOTIES_POLLING = 'FETCH_NOTIES_POLLING';
export const FETCH_NEW_MESSAGE = 'FETCH_NEW_MESSAGE';
export const GET_NEW_MESSAGE = 'GET_NEW_MESSAGE';
export const GET_NEW_MESSAGE_COUNT = 'GET_NEW_MESSAGE_COUNT';
export const GET_NEW_NOTI_COUNT = 'GET_NEW_NOTI_COUNT';
export const SET_WEB_NOTIFY_ENABLE = 'SET_WEB_NOTIFY_ENABLE';
export const SET_WEB_NOTIFY_UNABLE = 'SET_WEB_NOTIFY_UNABLE';
export const SET_SOCKET_CONNECTED = 'SET_SOCKET_CONNECTED';

const API_URL = 'http://127.0.0.1:3001/api/users';
const CHAT_URL = 'http://127.0.0.1:4000/api';
const token = JSON.parse(localStorage.getItem('token'));

export function dataFetch() {
  const request = axios.get(`${API_URL}/long_poll_noti`, {headers: {'token' : token}});

  return {    
    type: FETCH_NOTIES_POLLING,
    payload: request
  };
}

export function getNewMessage(messageIdx) {
  const request = axios.get(`${CHAT_URL}/message/${messageIdx}`, {headers: {'token' : token}});

  return{
    type: FETCH_NEW_MESSAGE,
    payload: request
  };
}

export function setSocketConnected() {
  let socket = null;
  if(localStorage.getItem('token') !== null && localStorage.getItem('token') !== undefined) {
    socket = io('http://localhost:4002', {transports: ['websocket', 'polling', 'flashsocket']});

    socket.on('connect', function() {
      socket.emit('store_client_info', { customId: parseInt(JSON.parse(localStorage.getItem('profile')).idx) });
    });
  }
  
  return {
    type: SET_SOCKET_CONNECTED,
    payload: socket
  };
}

export function getNewNotiCount() {
  const request = axios.get(`${API_URL}/newnoti`, {headers: {'token' : token}});

  return {
    type: GET_NEW_NOTI_COUNT,
    payload: request
  }
}

export function getNewMessageCount() {
  const request = axios.get(`${CHAT_URL}/newmessages`, {headers: {'token' : token}});
  
  return {
    type: GET_NEW_MESSAGE_COUNT,
    payload: request
  }
}

export function setWebNotifyEnable() {
  return {
    type: SET_WEB_NOTIFY_ENABLE
  };
}

export function setWebNotifyUnable() {
  return {
    type: SET_WEB_NOTIFY_UNABLE
  };
}