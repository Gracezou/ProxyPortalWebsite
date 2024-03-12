const USER_KEY = 'ruby_proxy_user';

export const getUserInfo = () => {
  return localStorage.getItem(USER_KEY);
}

export const setUserInfo = (value: string) => {
  localStorage.setItem(USER_KEY, value);
}

export const removeUserInfo = () => {
  localStorage.removeItem(USER_KEY);
}


const TOKEN_KEY = 'ruby_proxy_token'

export const getToken = () =>
  localStorage.getItem(TOKEN_KEY)

export const setToken = (token: string) =>
  localStorage.setItem(TOKEN_KEY, token)

export const removeToken = () =>
  localStorage.removeItem(TOKEN_KEY)


