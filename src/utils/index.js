import {getData} from '../shared/asyncStorages';
export const getTheme = async () => {
  const themeAsyncStore = await getData('EZTheme');
  return themeAsyncStore;
};
export let THEME;
