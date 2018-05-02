import { GET_CONVERSATIONS, GET_MESSAGES, SEND_MESSAGE, 
  MESSAGE_MAKE_UPDATE, MESSAGE_MAKE_NOT_UPDATE, CREATE_CONVERSATION } 
  from 'actions/users/MessageActions';

const INITIAL_STATE = {
  conversations: [],
  messages: [],
  message: '',
  update: false
}

export default function(state = INITIAL_STATE, action){
  switch(action.type){
    case GET_CONVERSATIONS:
      return { ...state, conversations: action.payload.data }

    case GET_MESSAGES:
      return { ...state, messages: action.payload.data }
    
    case MESSAGE_MAKE_UPDATE:
      return { ...state, update: true}
    
    case MESSAGE_MAKE_NOT_UPDATE:
      return { ...state, update: false}

    default:
      return state;
  }
}