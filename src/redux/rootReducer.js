import { combineReducers } from 'redux';

import userReducer from './User/user.reducer';
import settingsReducer from './Settings/settings.reducer';

const rootReducer = combineReducers({
  userReducer,
  settingsReducer,
});

export default rootReducer;
