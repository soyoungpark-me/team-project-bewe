import axios from 'axios';

export const FETCH_PURCHASED_LISTS = 'FETCH_PURCHASED_LISTS';
export const POST_GAME_PURCHASE = 'POST_GAME_PURCHASE';

const ROOT_URL = 'http://127.0.0.1:3002/api/store';

export function fetchPurchasedLists(){
  const request = axios.get(`${ROOT_URL}/mylists`, {
    headers: {
      'token': JSON.parse(localStorage.getItem('token'))
    }
  });

  return {
    type: FETCH_PURCHASED_LISTS,
    payload: request
  };
}

export function postGamePurchase(idx){
  const request = axios.post(`${ROOT_URL}/${idx}`, {
    headers: {
      'token': JSON.parse(localStorage.getItem('token'))
    }
  });

  return {
    type: POST_GAME_PURCHASE,
    payload: request
  }
}