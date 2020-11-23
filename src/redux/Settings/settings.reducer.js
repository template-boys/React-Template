import { SETTINGS_TOGGLE_THEME } from './settings.types';

const INITIAL_STATE = {
  isDarkMode: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SETTINGS_TOGGLE_THEME:
      return {
        ...state,
        isDarkMode: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
