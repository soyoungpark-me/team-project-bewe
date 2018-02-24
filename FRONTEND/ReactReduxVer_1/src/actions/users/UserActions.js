"use strict";

import axios from 'axios';

export const FETCH_MY_PROFILE = 'FETCH_MY_PROFILE';
export const FETCH_OTHER_PROFILE = 'FETCH_OTHER_PROFILE';

const API_URL = 'http://127.0.0.1:3000/api/users';

// export function fetchOtherProfile(idx){
//   const request = axios.get(`${API_URL}/${idx}`, 
//     {headers: {'token' : JSON.parse(localStorage.getItem('token'))}});
//   console.log('fetchother');
//   return{
//     type: FETCH_OTHER_PROFILE,
//     payload: request
//   };
// }

export function fetchMyProfile(idx){
  const request = axios.get(API_URL, 
    {headers: {'token' : JSON.parse(localStorage.getItem('token'))}});
  
  return{
    type: FETCH_MY_PROFILE,
    payload: request
  };
}