import { FETCH_NOTIES, CHECK_NOTI } from 'actions/users/NotiActions';

const INITIAL_STATE = {
  all: []
};

export default function(state = INITIAL_STATE, action){
  switch(action.type){
    case FETCH_NOTIES:
      return { ...state, all: action.payload.data.reverse() }

    case CHECK_NOTI:
      return true;
      
    default:
      return state;
  }
}