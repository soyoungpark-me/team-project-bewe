"use strict";

import axios from 'axios';

export const FETCH_FRIENDS = 'FETCH_FRIENDS';
export const SEARCH_FRIENDS = 'SEARCH_FRIENDS';
export const SEND_FRIEND_REQUEST = 'SEND_FRIEND_REQUEST';
export const REJECT_FRIEND_REQUEST = 'REJECT_FRIEND_REQUEST';
export const ACCEPT_FRIEND_REQUEST = 'ACCEPT_FRIEND_REQUEST';
export const CANCEL_FRIEND_REQUEST = 'CANCEL_FRIEND_REQUEST';

const API_URL = 'http://127.0.0.1:3001/api/users/friends';

const token = JSON.parse(localStorage.getItem('token')); 

export function fetchFriends(){ 
  const request = axios.get(API_URL, {headers: {'token' : token}});
  
  return {
    type: FETCH_FRIENDS,
    payload: request
  };
}

export function searchFriends(values){
  const request = axios.post(`http://127.0.0.1:3001/api/users/search`, values, {headers: {'token' : token}})
  
  return {
    type: SEARCH_FRIENDS,
    payload: request
  }
}

export function sendFriendRequest(idx){
  const request = axios.post(API_URL, 
    {'receiver_idx': idx}, {headers: {'token' : token}});

  return {
    type: SEND_FRIEND_REQUEST,
    payload: request
  }
}

export function rejectFriendRequest(idx){
  const request = axios.get(`${API_URL}/reject/${idx}`, {headers: {'token' : token}});
  
  return {
    type: REJECT_FRIEND_REQUEST,
    payload: request
  }
}

export function acceptFriendRequest(idx){
  const request = axios.get(`${API_URL}/accept/${idx}`, {headers: {'token' : token}});
  
  return {
    type: ACCEPT_FRIEND_REQUEST,
    payload: request
  }
}

export function cancelFriendRequest(idx){
  const request = axios.get(`${API_URL}/cancel/${idx}`, {headers: {'token' : token}});
  
  return {
    type: CANCEL_FRIEND_REQUEST,
    payload: request
  }
}