import { SETTINGS_TOGGLE_THEME } from './settings.types';

export const toggleTheme = () => {
  return (dispatch, getState) => {
    const state = getState();
    const newTheme = state.settingsReducer.isDarkMode ? 'light' : 'dark';
    document.documentElement.className = '';
    document.documentElement.classList.add(`theme-${newTheme}`);
    dispatch({
      type: SETTINGS_TOGGLE_THEME,
      payload: !state.settingsReducer.isDarkMode,
    });
  };
};
