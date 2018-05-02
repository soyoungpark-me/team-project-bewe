import { FETCH_NOTIES_POLLING, FETCH_NEW_MESSAGE, SET_SOCKET_CONNECTED, 
  SET_WEB_NOTIFY_ENABLE, SET_WEB_NOTIFY_UNABLE,
  GET_NEW_MESSAGE_COUNT, GET_NEW_NOTI_COUNT, GET_NEW_MESSAGE } 
  from 'actions/AppActions.js';

let grant = '';

if(Notification.permission === 'granted') {
  grant = true;
} else {
  grant = false;
}

const initialState = {  
  newNoti: {},
  newNotiCount: 0,
  newMessageCount: 0,
  grant: grant,
  socket: null,
  newMessage: {}
};

export default function data (state = initialState, action) {  
  switch (action.type) {    
    case FETCH_NOTIES_POLLING: 
      return { ...state, newNoti: action.payload.data };

    case FETCH_NEW_MESSAGE:
      return { ...state, newMessage: action.payload.data };

    case SET_SOCKET_CONNECTED:
      return { ...state, socket: action.payload };

    case GET_NEW_MESSAGE_COUNT:
      return { ...state, newMessageCount: action.payload.data };

    case GET_NEW_NOTI_COUNT:
      return { ...state, newNotiCount: action.payload.data };
      
    case SET_WEB_NOTIFY_ENABLE:
      return { ...state, grant: true};
    
    case SET_WEB_NOTIFY_UNABLE:
      return { ...state, grant: false};
    
    default:
      return state;
  }
}