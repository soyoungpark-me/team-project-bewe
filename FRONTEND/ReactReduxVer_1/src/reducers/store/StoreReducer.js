import { FETCH_PURCHASED_LISTS } from "actions/store/StoreAction";

const INITIAL_STATE = {
  all: []
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type){
    case FETCH_PURCHASED_LISTS:
      return { ...state, all: action.payload.data.result };

    default:
      return state;
  }
}