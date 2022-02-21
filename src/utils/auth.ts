import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  SESSION_KEY
} from 'src/constants/auth';

const authHeader = (): Record<string, string> => {
  const accessToken = getAccessToken();

  if (accessToken != null) {
    return {Authorization: `Bearer ${accessToken}`};
  } else {
    return {};
  }
};

const getAccessToken = () => {
  return getSession()[ACCESS_TOKEN_KEY];
};

const getRefreshToken = () => {
  return getSession()[REFRESH_TOKEN_KEY];
};

const getSession = () => {
  const authInfo = localStorage.getItem(SESSION_KEY);
  if (authInfo) {
    return JSON.parse(authInfo);
  }
  return {};
};

const setSession = (data: any) => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(data));
};

const clearSession = () => {
  localStorage.removeItem(SESSION_KEY);
};

export {authHeader, getAccessToken, getRefreshToken, setSession, clearSession};
