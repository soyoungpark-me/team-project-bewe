import { combineReducers } from 'redux';
// import messageValidation from './validation/messageValidation';

import AppReducer from './AppReducer';
import NotiReducer from './users/NotiReducer';
import FriendReducer from './users/FriendReducer';
import UserReducer from './users/UserReducer';
import MessageReducer from './users/MessageReducer';
import CMSReducer from './CMS/CMSReducer';
import StoreReducer from './store/StoreReducer';
import RankReducer from './ranks/RankReducer';

import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  app: AppReducer,
  user: UserReducer,
  noties: NotiReducer,
  friends: FriendReducer,
  CMS: CMSReducer,
  store: StoreReducer,
  messages: MessageReducer,
  form: formReducer,
  ranks: RankReducer
});

export default rootReducer;
