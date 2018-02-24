"use strict";

import axios from 'axios';

export const FETCH_USER_HAS_GAMES_RANK = 'FETCH_USER_HAS_GAMES_RANK';
export const FETCH_USER_PLAY_TIME_RANK = 'FETCH_USER_PLAY_TIME_RANK';
const API_URL = 'http://127.0.0.1:3001/api/ranks';

export function fetchUserHasGameRank(){
  let request = '';

  if (!localStorage.getItem('token')) {
    request = axios.get(`${API_URL}/users/buy`);
  } else {
    request = axios.get(`${API_URL}/users/buy`, { 
      headers: {
        'token': JSON.parse(localStorage.getItem('token'))
      }
    });
  } 
  
  return{
    type: FETCH_USER_HAS_GAMES_RANK,
    payload: request
  };
}

export function fetchUserPlayTimeRank(){
  let request = '';

  if (!localStorage.getItem('token')) {
    request = axios.get(`${API_URL}/users/time`);
  } else {
    request = axios.get(`${API_URL}/users/time`, { 
      headers: {
        'token': JSON.parse(localStorage.getItem('token'))
      }
    });
  } 

  return{
    type: FETCH_USER_PLAY_TIME_RANK,
    payload: request
  };
}