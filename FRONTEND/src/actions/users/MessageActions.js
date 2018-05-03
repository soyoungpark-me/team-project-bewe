"use strict";

import axios from 'axios';

export const CHECK_CONVERSATION = 'CHECK_CONVERSATION';
export const GET_CONVERSATIONS = 'GET_CONVERSATIONS';
export const CREATE_CONVERSATION = 'CREATE_CONVERSATION';
export const GET_MESSAGES = 'GET_MESSAGES';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const MESSAGE_MAKE_UPDATE = 'MESSAGE_MAKE_UPDATE';
export const MESSAGE_MAKE_NOT_UPDATE = 'MESSAGE_MAKE_NOT_UPDATE';

const ROOT_URL = 'http://localhost:9005/api';
const token = JSON.parse(localStorage.getItem('token')); 
  
export function getConversations(){
  const request = axios.get(`${ROOT_URL}/messages`, {headers: {'token' : token}});

  return {
    type: GET_CONVERSATIONS,
    payload: request
  }
}

export function createConversation(idx) {
  const request = axios.post(`${ROOT_URL}/messages`, 
    {'receiver_idx': idx}, {headers: {'token' : token}});

  return {
    type: CREATE_CONVERSATION,
    payload: request
  }
}

export function getMessage(messageIdx){
  const request = axios.get(`${ROOT_URL}/messages/${conversationIdx}`, {headers: {'token' : token}});
  
  return {
    type: GET_MESSAGES,
    payload: request
  }
}

export function getMessages(conversationIdx){
  const request = axios.get(`${ROOT_URL}/messages/${conversationIdx}`, {headers: {'token' : token}});
  
  return {
    type: GET_MESSAGES,
    payload: request
  }
}

export function sendMessage(values, conversationIdx){
  const userIdx = JSON.parse(localStorage.getItem('profile')).idx;
  
  return (dispatch, getState) => {
    const state = getState();

    // axios.post(`${ROOT_URL}/${conversationIdx}`, values, {headers: {'token' : token}})
    
    // axios로 직접 통신하지 않고 app에 직접 연결된 socket을 통해 send_message 이벤트를 발생시킨다.
    state.app.socket.emit('send_message', conversationIdx, userIdx, values.contents);
    
    dispatch({
      type: SEND_MESSAGE
    });
  }
}

export function makeUpdate(){
  return {
    type: MESSAGE_MAKE_UPDATE
  }
}

export function makeNotUpdate(){
  return {
    type: MESSAGE_MAKE_NOT_UPDATE
  }
}