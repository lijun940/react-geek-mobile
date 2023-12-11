const KEY = "geek-itcast-21-token";
const CHANNEL_KEY = 'geek-itcast-21-channels'
export const getTokens = () => JSON.parse(localStorage.getItem(KEY)) || {};

export const setTokens = (tokens) =>
  localStorage.setItem(KEY, JSON.stringify(tokens));

export const removeTokens = () => localStorage.removeItem(KEY);

export const isAuth = () => !!getTokens().token;


export const setLocalChannels = (channels) => {
  localStorage.setItem(CHANNEL_KEY, JSON.stringify(channels))
}
export const getLocalChannels = () => {
  return JSON.parse(localStorage.getItem(CHANNEL_KEY))
}
export const removeLocalChannels = () => {
  localStorage.removeItem(CHANNEL_KEY)
}

