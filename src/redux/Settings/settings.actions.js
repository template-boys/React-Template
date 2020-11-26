import { SETTINGS_TOGGLE_THEME } from './settings.types';

export const toggleTheme = (theme) => {
  return (dispatch, getState) => {
    if (!!theme) {
      dispatch({
        type: SETTINGS_TOGGLE_THEME,
        payload: theme === 'dark' ? true : false,
      });
      localStorage.setItem('theme', theme);
      document.documentElement.classList.add(`theme-${theme}`);
    } else {
      const state = getState();
      const newTheme = state.settingsReducer.isDarkMode ? 'light' : 'dark';
      document.documentElement.className = '';
      document.documentElement.classList.add(`theme-${newTheme}`);
      localStorage.setItem('theme', newTheme);
      dispatch({
        type: SETTINGS_TOGGLE_THEME,
        payload: !state.settingsReducer.isDarkMode,
      });
    }
  };
};
