import { FETCH_CONTENTS, FETCH_POST } from "../../actions/CMS/CMSAction";

const INITIAL_STATE = {
  all: []
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type){
    case FETCH_CONTENTS:
      return { ...state, all: action.payload.data.result };


    case FETCH_POST:
      return { ...state, all: action.payload.data.result };
    default:
      return state;
  }
}