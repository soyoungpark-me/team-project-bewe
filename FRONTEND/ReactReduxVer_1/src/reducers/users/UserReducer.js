import { FETCH_MY_PROFILE, FETCH_OTHER_PROFILE } from 'actions/users/UserActions';

const INITIAL_STATE = {
  profile: {},
  my_profile: ''
};

export default function(state = INITIAL_STATE, action){
  switch(action.type){
    case FETCH_OTHER_PROFILE:
      return { ...state, profile: action.payload.data.result }
    
    case FETCH_MY_PROFILE:
      return { my_profile: action.payload.data }
      
    default:
      return state;
  }
}