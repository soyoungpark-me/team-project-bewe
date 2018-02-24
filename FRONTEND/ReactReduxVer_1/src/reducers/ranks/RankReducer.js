import { FETCH_GAME_HAS_USERS_RANK, FETCH_GAME_PLAY_TIME_RANK } 
  from 'actions/ranks/GameRankAction.js';
import { FETCH_USER_HAS_GAMES_RANK, FETCH_USER_PLAY_TIME_RANK } 
  from 'actions/ranks/UserRankAction.js';

const INITIAL_STATE = {
  time: [],
  buy: []
};

export default function(state = INITIAL_STATE, action){
  switch(action.type){
    case FETCH_GAME_HAS_USERS_RANK:
      return { ...state, buy: action.payload.data }

    case FETCH_USER_HAS_GAMES_RANK:
      return { ...state, buy: action.payload.data }
    
    case FETCH_GAME_PLAY_TIME_RANK:
      return { ...state, time: action.payload.data }
    
    case FETCH_USER_PLAY_TIME_RANK:
      return { ...state, time: action.payload.data }
      
    default:
      return state;
  }
}