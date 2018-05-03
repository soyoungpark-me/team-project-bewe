"use strict";

import axios from 'axios';

export const FETCH_NOTIES = 'FETCH_NOTIES';
export const CHECK_NOTI = 'CHECK_NOTI';

const API_URL = 'http://127.0.0.1:9002/api/users/noti';
const token = JSON.parse(localStorage.getItem('token')); 

export function fetchNoties(){  
  const request = axios.get(API_URL, {headers: {'token' : token}});
  
  return{
    type: FETCH_NOTIES,
    payload: request
  };
}

export function checkNoti(idx){
  const request = axios.get(`${API_URL}/${idx}`, {headers: {'token' : token}});

  return{
    type: CHECK_NOTI
  }
}