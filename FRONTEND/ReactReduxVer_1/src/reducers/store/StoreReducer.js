import { FETCH_PURCHASED_LISTS, FETCH_STORE_LISTS, POST_GAME_PURCHASE } from '../../actions/store/StoreAction';

const INITIAL_STATE = {
  all: []
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type){
    case FETCH_PURCHASED_LISTS:
      return { ...state, all: action.payload.data.result };

    case POST_GAME_PURCHASE:
      return { ...state, all: action.payload.data.result };

    case FETCH_STORE_LISTS:
      return { ...state, all: action.payload.data.result };

    default:
      return state;
  }
}