import { Toast } from 'antd-mobile'
import axios from 'axios'
import { getTokens, setTokens } from './storage'
import { history } from './history'
import store from '@/store'
import { logoutAction, saveToken } from '@/store/actions/login'
const baseURL = 'https://geek.itheima.net/v1_0/'
const instance = axios.create({
  timeout: 5000,
  baseURL,
})

instance.interceptors.request.use(
  (config) => {
    const token = getTokens().token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
instance.interceptors.response.use(
  (response) => {
    return response.data
  },
  async (error) => {
    console.dir(error)
    if (!error.response) {
      Toast.info('网络繁忙，请稍后重试')
      return Promise.reject(error)
    }
    const {response, config} = error
    if(response.status !== 401) {
      Toast.info(response.data.message)
      return Promise.reject(error)
    }
    const {token,refresh_token} = getTokens()
    console.log(token, refresh_token)
    if(!token || !refresh_token) {
      console.log(11)
      history.push({
        pathname: '/login',
        state: {
          from: history.location.pathname,
        }
      })
      return Promise.reject(error) 
    }
    try {
      const res = await axios({
        method: 'put',
        url: baseURL + 'authorizations',
        headers: {
          Authorization: 'Bearer ' + refresh_token
        }
      })
      const tokenInfo = {
        token: res.data.data.token,
        refresh_token: refresh_token
      }
      store.dispatch(saveToken(tokenInfo))
      setTokens(tokenInfo)
      return instance(config)
      // token刷新后，要把失败的请求重新发一下
    } catch (error) {
      store.dispatch(logoutAction())
      history.push({
        pathname: '/login',
        state: {
          from: history.location.pathname,
        }
      })
      Toast.info('登录失效，请重新登录')
      return Promise.reject(error) 
    }
  }
)
export default instance
