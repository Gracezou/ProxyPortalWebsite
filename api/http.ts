import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { getToken } from './storage';
const http = axios.create()
// 基础路径
export const BASE_URL = 'http://api.mcdlmail.com'

http.interceptors.request.use(
  async (config) => {
    config.baseURL = BASE_URL
    const headers = config.headers || {}
    const token = getToken()
    if (token) {
      headers.Authorization = `${token}`
    }
    config.headers = headers
    return config
  },
  (error) => Promise.reject(error)
)

class HttpError extends Error {
  response: AxiosResponse
  constructor(response: AxiosResponse) {
    super(`${response.status} for ${response.statusText}`)
    this.name = 'HttpError'
    this.response = response
  }
}

http.interceptors.response.use(
  (response) => {
    // http status 200 ~ 300
    if (response.status >= 200 && response.status < 300) {
      // bussiness code 200 
      if (response.data.code === 200) {
        return Promise.resolve(response.data.data)
      } else {
        if (response.config.headers.noMessage) return Promise.reject(response)
        ElMessage({ type: 'error', message: response.data.message, grouping: true })
        return Promise.reject(response)
      }
    }
    return Promise.reject(new HttpError(response))
  },
  (error) => {
    if (!error.response) return ElMessage({ type: 'error', message: 'server error', grouping: true })
    if (error.response.status == 401) {
      useRouter().push('/login')
    } else if (error.response.status == 422) {
      // 参数错误
      ElMessage({ type: 'error', message: "params is error", grouping: true })
    } else if (error.response.status == 429) {
      // 访问频率
      ElMessage({ type: 'error', message: "You don't have the permission", grouping: true })
    } else {
      if (!error.response.config.hiddenTip) {
        const message = error.response.data?.error || 'server error'
        ElMessage({ type: 'error', message: message, grouping: true })
      }
      throw error
    }
    return Promise.reject(error)
  }
)

export default http
