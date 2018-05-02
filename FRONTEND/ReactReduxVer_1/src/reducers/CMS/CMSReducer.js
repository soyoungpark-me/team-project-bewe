import {FETCH_REQUEST_ALLOW_LIST, FETCH_CONTENTS, FETCH_POST, FETCH_POST_DETAIL, ALLOW_CONTENTS} from "../../actions/CMS/CMSAction";

const INITIAL_STATE = {
  all: []
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type){
    case FETCH_CONTENTS:
      return { ...state, all: action.payload.data.result };

    case FETCH_POST:
      return { ...state, all: action.payload.data.result };

    case FETCH_POST_DETAIL:
      return { ...state, all: action.payload.data.result };

    case ALLOW_CONTENTS:
      return { ...state, all: action.payload.data.result };

    case FETCH_REQUEST_ALLOW_LIST:
      return { ...state, all: action.payload.data.result };

    default:
      return state;
  }
}