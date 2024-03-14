const USER_KEY = 'ruby_proxy_user';

export const getUserInfo = () => {
  const userInfo = localStorage.getItem(USER_KEY);
  if (!userInfo || userInfo === 'undefined') return null
  return userInfo
}

export const setUserInfo = (value: string) => {
  localStorage.setItem(USER_KEY, value);
}

export const removeUserInfo = () => {
  localStorage.removeItem(USER_KEY);
}


const TOKEN_KEY = 'ruby_proxy_token'

export const getToken = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token || token === 'undefined') return null
  return token
}

export const setToken = (token: string) =>
  localStorage.setItem(TOKEN_KEY, token)

export const removeToken = () =>
  localStorage.removeItem(TOKEN_KEY)


